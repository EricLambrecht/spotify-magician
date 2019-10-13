import shuffle from 'lodash/shuffle'

import AbstractShuffle from './AbstractShuffle'

export default class RandomShuffle extends AbstractShuffle {
  static shuffle(playlist, options) {
    const uris = this.getUris(playlist)
    return shuffle(uris)
  }
}
