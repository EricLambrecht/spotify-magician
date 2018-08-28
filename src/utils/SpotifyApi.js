import SpotifyWebApi from 'spotify-web-api-js';

/**
 * This class extends the spotify web api (spotify-web-api-js).
 *
 * It adds's some useful functions to the API and streamlines error handling for our app.
 */
export default class SpotifyApi extends SpotifyWebApi {
  constructor() {
    super();
    this.setAccessToken('');
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
   * Returns a user's playlists
   * @param options
   * @returns {Promise<Object>}
   */
  async getUserPlaylists(options = {}) {
    try {
      const apiResult = await super.getUserPlaylists(options);
      return apiResult.items;
    } catch (err) {
      throw SpotifyApi.handleApiError(err);
    }
  }

  /**
   * This function fetches a slice of a playlist's tracks
   * @param playlistId A spotify playlist ID
   * @param offset Only tracks above this index will be fetched
   * @param limit The maximum amount of tracks that will be fetched
   * @returns {Promise<SpotifyApi.PlaylistTrackResponse>}
   */
  async getPlaylistSlice(playlistId, offset = 0, limit = 0) {
    try {
      const tracks = await this.getPlaylistTracks(playlistId, {
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
      const playlist = await this.getPlaylist(playlistId);

      // Do we have all tracks?
      const numberOfFetchedTracks = playlist.tracks.items.length + playlist.tracks.offset;
      if (numberOfFetchedTracks < playlist.tracks.total) {
        const remainingTracks = await this.getPlaylistSlice(playlistId, numberOfFetchedTracks, 100);
        playlist.tracks.items = playlist.tracks.items.concat(remainingTracks.items);
      }
      return playlist;
    } catch (err) {
      throw SpotifyApi.handleApiError(err);
    }
  }
}
