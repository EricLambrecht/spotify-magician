import Rearranger from './Rearranger';

export default class AbstractShuffle extends Rearranger {
  static rearrange(playlist, options = {}) {
    return this.sort(playlist, options);
  }

  /**
   * Sorts a Spotify playlist and returns the shuffled URIs of the tracks.
   * @param {SpotifyApi.SinglePlaylistResponse} playlist A Spotify playlist
   * @param options (optional) An object of options
   * @returns {string[]}
   */
  static shuffle(playlist, options) {
    throw new Error('This abstract class has no implementation of "shuffle()". Please extend it.');
  }
}
