/**
 * @typedef Rearranger
 * @property {function} rearrange Rearranges a Spotify playlist
 */
export default class Rearranger {
  /**
   * Returns an array of track URIs that resembles the reorder
   * @param {SpotifyApi.SinglePlaylistResponse} playlist A Spotify playlist
   * @param {Options} options An array of options
   * @returns {string[]} An array of URIs
   */
  static rearrange(playlist, options = {}) {
    return this.getUris(playlist);
  }

  /**
   * Extracts the URIs of a spotify playlist
   * @param {SpotifyApi.SinglePlaylistResponse} playlist A Spotify playlist
   * @returns {string[]} An array of URIs
   */
  static getUris(playlist) {
    return playlist.tracks.items.map(item => item.track.uri);
  }
}
