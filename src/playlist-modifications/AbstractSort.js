import Rearranger from './Rearranger';


export default class AbstractSort extends Rearranger {
  static rearrange(playlist, options = { order: 'ASC' }) {
    if (!options.order || !['ASC', 'DESC'].includes(options.order)) {
      throw Error('"options.order" must be defined and be either "ASC" or "DESC" in order to sort.');
    }
    const order = { options };
    return this.sort(playlist, order, options);
  }

  /**
   * Sorts a Spotify playlist and returns the sorted URIs of the tracks.
   * @param {SpotifyApi.SinglePlaylistResponse} playlist A Spotify playlist
   * @param {String} order Either "ASC" or "DESC".
   * @param {Object} options An object of options
   * @returns {string[]}
   */
  static sort(playlist, order, options) {
    throw new Error('This abstract class has no implementation of "sort()". Please extend it.');
  }

  /**
   * Expects to easily comparable values (must be comparable by < / >) and
   * returns either -1, 0 or 1.
   *
   * Also takes order into account (must be "ASC" or "DESC").
   *
   * @param {*} comparableA Comparable value A
   * @param {*} comparableB Comparable value B
   * @param {String} order Either "ASC" or "DESC".
   * @returns {number} -1, 0 or 1
   */
  static compare(comparableA, comparableB, order) {
    if (comparableA > comparableB) {
      return this.greaterThanValue(order);
    }

    if (comparableA < comparableB) {
      return this.smallerThanValue(order);
    }

    return 0;
  }

  /**
   * Returns the value for A < B.
   * @param order
   * @returns {number}
   */
  static smallerThanValue(order) {
    return order === 'ASC' ? 1 : -1;
  }

  /**
   * Returns the value for A > B.
   * @param order
   * @returns {number}
   */
  static greaterThanValue(order) {
    return order === 'ASC' ? -1 : 1;
  }
}
