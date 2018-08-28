import SpotifyWebApi from 'spotify-web-api-js';

/**
 * This class is a light wrapper around the spotify web api (spotify-web-api-js)
 *
 * It is used to add some useful functions to the API and streamline error handling.
 */
export default class SpotifyApi {
  constructor() {
    this.api = new SpotifyWebApi();
    this.api.setAccessToken('');
  }

  /**
   * Use this function to authenticate the user and therefore enable api access
   * @param accessToken
   */
  setAccessToken(accessToken) {
    this.api.setAccessToken(accessToken);
  }

  /**
   * This method throws errors based on the error object that is provided
   * @param error
   * @throws
   */
  static handleApiError(error) {
    const res = JSON.parse(error.response);

    // Is this even an API error?
    if (!res.error) {
      throw error;
    }

    // See if access token expired
    if (res.error.status === 401) {
      throw new Error('Token expired');
    }

    // Throw error with api error message (or unknown, if empty)
    throw new Error(res.error.message || 'An unknown error occured');
  }

  /**
   * This function fetches a slice of a playlist's tracks
   * @param playlistId A spotify playlist ID
   * @param offset Only tracks above this index will be fetched
   * @param limit The maximum amount of tracks that will be fetched
   * @returns {Promise<SpotifyApi.PlaylistTrackResponse>}
   */
  async getTracks(playlistId, offset = 0, limit = 0) {
    try {
      const tracks = await this.api.getPlaylistTracks(playlistId, {
        limit,
        offset,
      });
      const numberOfFetchedTracks = tracks.items.length + tracks.offset;
      if (numberOfFetchedTracks < tracks.total) {
        const remainingTracks = await this.getTracks(numberOfFetchedTracks, 100);
        tracks.items = tracks.items.concat(remainingTracks.items);
      }
      return tracks;
    } catch (err) {
      throw SpotifyApi.handleApiError(err);
    }
  }

  /**
   * This function fetches a whole playlist. This is useful if you want to get more than just
   * the first 100 tracks.
   * @param playlistId A spotify playlist ID
   * @returns {Promise<SpotifyApi.SinglePlaylistResponse>}
   */
  async getFullPlaylist(playlistId) {
    try {
      const playlist = await this.api.getPlaylist(playlistId);

      // Do we have all tracks?
      const numberOfFetchedTracks = playlist.tracks.items.length + playlist.tracks.offset;
      if (numberOfFetchedTracks < playlist.tracks.total) {
        const remainingTracks = await this.getTracks(playlistId, numberOfFetchedTracks, 100);
        playlist.tracks.items = playlist.tracks.items.concat(remainingTracks.items);
      }
      return playlist;
    } catch (err) {
      throw SpotifyApi.handleApiError(err);
    }
  }
}
