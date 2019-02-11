import SpotifyWebApi from 'spotify-web-api-js';
import chunk from 'lodash/chunk';

export const api = new SpotifyWebApi();

/**
 * This is a collection of (mostly) functions that use the spotify-web-api.
 *
 * These functions are meant to make accessing frequently used data easier.
 * You don't have to use it, though. You can access the api directly by
 * importing 'spotify-web-api-js'.
 */
export default class Spotify {
  /**
   * This method dispatches an action that sets the editor error, so it doesn't have to be
   * handled manually each time.
   * @param dispatch dispatch function of the calling store module
   * @param error The error that was catched
   */
  static handleApiError(dispatch, error) {
    if (typeof error.response === 'undefined') {
      // This is not an API error, it's a javascript error.
      dispatch('app/addToast', { message: error.message, type: 'error' }, { root: true });
      return;
    }

    const res = JSON.parse(error.response);

    if (!res.error) {
      // We can't process this error if the 'error' property is missing
      dispatch('app/addToast', { message: error.message, type: 'error' }, { root: true });
      return;
    }

    // See if access token expired
    if (res.error.status === 401) {
      dispatch('app/setError', 'Token expired', { root: true });
      return;
    }

    // Throw error with api error message (or unknown, if empty)
    dispatch('app/addToast', {
      message: res.error.message || 'An unknown error occured',
      type: 'error',
    }, { root: true });
  }

  /**
   * Just a small shorthand method to set the api access token directly via this helper.
   * @param token
   */
  static setAccessToken(token) {
    api.setAccessToken(token);
  }

  /**
   * Returns a user's playlists
   * @param options
   * @returns {Promise<Object>}
   * @throws
   */
  static async getUserPlaylists(options = {}) {
    const apiResult = await api.getUserPlaylists(options);
    return apiResult.items;
  }

  /**
   * This function fetches a slice of a playlist's tracks
   * @param playlistId A spotify playlist ID
   * @param offset Only tracks above this index will be fetched
   * @param limit The maximum amount of tracks that will be fetched
   * @returns {Promise<SpotifyWebApi.PlaylistTrackResponse>}
   * @throws
   */
  static async getPlaylistSlice(playlistId, offset = 0, limit = 0) {
    const tracks = await api.getPlaylistTracks(playlistId, {
      limit,
      offset,
    });
    const numberOfFetchedTracks = tracks.items.length + tracks.offset;
    if (numberOfFetchedTracks < tracks.total) {
      const remainingTracks = await Spotify.getTracks(numberOfFetchedTracks, 100);
      tracks.items = tracks.items.concat(remainingTracks.items);
    }
    return tracks;
  }

  /**
   * This function fetches a whole playlist. This is useful if you want to get more than just
   * the first 100 tracks.
   * @param playlistId A spotify playlist ID
   * @returns {Promise<SpotifyWebApi.SinglePlaylistResponse>}
   */
  static async getFullPlaylist(playlistId) {
    const playlist = await api.getPlaylist(playlistId);

    // Do we have all tracks?
    const numberOfFetchedTracks = playlist.tracks.items.length + playlist.tracks.offset;
    if (numberOfFetchedTracks < playlist.tracks.total) {
      const nextSlice = await Spotify.getPlaylistSlice(playlistId, numberOfFetchedTracks, 100);
      playlist.tracks.items = playlist.tracks.items.concat(nextSlice.items);
    }
    return playlist;
  }

  /**
   * This function returns an array of tracks that match the search query
   * @param query
   * @param limit (optional) defaults to 8.
   * @returns {Promise<SpotifyWebApi.TrackSearchResponse>}
   */
  static async searchTracks(query, limit = 8) {
    const result = await api.searchTracks(query, { limit });
    const { tracks: pagedTracks } = result;
    const { items: tracks } = pagedTracks;

    // TODO: Sort by track popularity.
    // And maybe fetch more than 20 (if performance allows) to improve sorting.
    return tracks.map(track => ({
      name: track.name,
      uri: track.uri,
      artist: Spotify.getArtistNameFromTrack(track),
      album: track.album.name,
      releaseDate: Spotify.getReleaseDate(track),
    }));
  }

  /**
   * Adds multiple tracks to a playlist
   * Supports more than 100 tracks, unlike the raw Spotify Web API endpoints.
   * @param playlistId
   * @param uris
   * @returns {Promise}
   */
  static async addTracksToPlaylist(playlistId, uris) {
    const chunks = chunk(uris, 100);
    for (const uriChunk of chunks) { // eslint-disable-line no-restricted-syntax
      await api.addTracksToPlaylist(playlistId, uriChunk); // eslint-disable-line no-await-in-loop
    }
  }

  /**
   * Returns the release date of a track
   * @param track
   * @returns {string}
   */
  static getReleaseDate(track) {
    // TODO: Improve this function by using release_date_precision.
    return track.album.release_date;
  }

  /**
   * Returns a list of all involved artists of a track (separated by comma).
   * @param track
   * @returns {string}
   */
  static getArtistNameFromTrack(track) {
    return track.artists.map(artist => artist.name).join(',');
  }

  /**
   * Replaces the entire playlist with the provided track-URIs.
   * Since Spotify Web API supports only 100 tracks, array greater than
   * 100 tracks will be split into chunks to replace everything.
   */
  static async replaceTracks(playlistId, uris) {
    const chunks = chunk(uris, 100);
    const firstChunk = chunks.shift();
    await api.replaceTracksInPlaylist(playlistId, firstChunk);

    if (chunks.length > 0) {
      for (const uriChunk of chunks) { // eslint-disable-line no-restricted-syntax
        await api.addTracksToPlaylist(playlistId, uriChunk); // eslint-disable-line no-await-in-loop
      }
    }
  }
}
