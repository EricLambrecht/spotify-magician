import AbstractShuffle from './AbstractShuffle';

export default class RandomShuffle extends AbstractShuffle {
  static shuffle(playlist, options) {
    const uris = this.getUris(playlist);
    return this.shuffleArray(uris);
  }

  /**
   * Shuffles array in place. (Fisher-Yates-Shuffle)
   * @param {Array} a items An array containing the items.
   */

  static shuffleArray(a) {
    /* eslint-disable */
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
    /* eslint-enable */
  }
}
