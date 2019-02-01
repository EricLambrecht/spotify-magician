import get from 'lodash/get';
import AbstractSort from './AbstractSort';

export default class Sort extends AbstractSort {
  static sort(playlist, order, options) {
    const tracks = [...playlist.tracks.items.map(item => item.track)];
    const { sortBy } = options;
    if (typeof sortBy === 'undefined') {
      throw Error('"options.sortBy must be defined in order to sort by track property.');
    }

    tracks.sort((a, b) => {
      const propertyA = get(a, sortBy);
      const propertyB = get(b, sortBy);

      return this.compare(propertyA, propertyB, order);
    });

    return tracks.map(track => track.uri);
  }
}
