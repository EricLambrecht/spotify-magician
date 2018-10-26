export default {
  rearrange(playlist) {
    let uris = playlist.tracks.items.map(item => item.track.uri);
    uris = this.shuffleArray(uris);
    return uris;
  },

  /**
   * Shuffles array in place. (Fisher-Yates-Shuffle)
   * @param {Array} a items An array containing the items.
   */

  shuffleArray(a) {
    /* eslint-disable */
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
    /* eslint-enable */
  },
};
