/* eslint-disable import/no-cycle */

import SpotifyWebApi from 'spotify-web-api-js';
import store from '../store';

const api = new SpotifyWebApi();

/**
 * This is a collection of (mostly) functions that use the spotify-web-api.
 *
 * These functions are meant to make accessing frequently used data easier.
 * You don't have to use it, though. You can access the api directly by
 * importing 'spotify-web-api-js'.
 *
 * About the circular dependency: Currently, this file has a circular
 * dependency to the store, because it dispatches actions (to set errors).
 * I disabled the es-lint check here, because I don't know a better solution.
 * I really want this code to be able to dispatch actions. Maybe it's not
 * a problem after all... Maybe it's solvable via a Vuex plugin. IDK...
 */
export default class Spotify {
  /**
   * This method dispatches an action that sets the editor error, so it doesn't have to be
   * handled manually each time.
   * @param error The error that was catched
   */
  static handleApiError(error) {
    if (typeof error.response === 'undefined') {
      // This is not an API error, it's a javascript error.
      store.dispatch('editor/setError', error.message);
      return;
    }

    const res = JSON.parse(error.response);

    if (!res.error) {
      // We can't process this error if the 'error' property is missing
      store.dispatch('editor/setError', error.message);
      return;
    }

    // See if access token expired
    if (res.error.status === 401) {
      store.dispatch('editor/setError', 'Token expired');
      return;
    }

    // Throw error with api error message (or unknown, if empty)
    store.dispatch('editor/setError', res.error.message || 'An unknown error occured');
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
   */
  static async getUserPlaylists(options = {}) {
    try {
      const apiResult = await api.getUserPlaylists(options);
      return apiResult.items;
    } catch (err) {
      throw Spotify.handleApiError(err);
    }
  }

  /**
   * This function fetches a slice of a playlist's tracks
   * @param playlistId A spotify playlist ID
   * @param offset Only tracks above this index will be fetched
   * @param limit The maximum amount of tracks that will be fetched
   * @returns {Promise<SpotifyWebApi.PlaylistTrackResponse>}
   */
  static async getPlaylistSlice(playlistId, offset = 0, limit = 0) {
    try {
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
    } catch (err) {
      throw Spotify.handleApiError(err);
    }
  }

  /**
   * This function fetches a whole playlist. This is useful if you want to get more than just
   * the first 100 tracks.
   * @param playlistId A spotify playlist ID
   * @returns {Promise<SpotifyWebApi.SinglePlaylistResponse>}
   */
  static async getFullPlaylist(playlistId) {
    try {
      const playlist = await api.getPlaylist(playlistId);

      // Do we have all tracks?
      const numberOfFetchedTracks = playlist.tracks.items.length + playlist.tracks.offset;
      if (numberOfFetchedTracks < playlist.tracks.total) {
        const nextSlice = await Spotify.getPlaylistSlice(playlistId, numberOfFetchedTracks, 100);
        playlist.tracks.items = playlist.tracks.items.concat(nextSlice.items);
      }
      return playlist;
    } catch (err) {
      throw Spotify.handleApiError(err);
    }
  }

  /**
   * This function returns an array of (uri => name) pairs for tracks that match the search query
   * @param query
   * @returns {Promise<SpotifyWebApi.TrackSearchResponse>}
   */
  static async searchTracks(query) {
    try {
      const result = await api.searchTracks(query);
      const { tracks: pagedTracks } = result;
      const { items: tracks } = pagedTracks;
      return tracks.map(track => ({ name: track.name, uri: track.uri }));
    } catch (err) {
      throw Spotify.handleApiError(err);
    }
  }
}
