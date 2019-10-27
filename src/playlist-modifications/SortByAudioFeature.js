import AbstractSort from './AbstractSort'

export default class SortByAudioFeature extends AbstractSort {
  static sort(playlist, order, options) {
    const { sortBy, audioFeatures } = options

    if (typeof sortBy === 'undefined') {
      throw Error(
        '"options.sortBy" must be defined in order to sort by audio feature.'
      )
    }
    if (typeof audioFeatures === 'undefined') {
      throw Error(
        '"options.audioFeatures" must be provided in order to sort by audio feature.'
      )
    }

    let uris = this.getUris(playlist)

    // Map to uri AND index to make the index available during sorting
    uris = uris.map((uri, index) => ({
      uri,
      index,
    }))

    uris.sort((a, b) => {
      const audioFeatureA = audioFeatures[a.index][sortBy]
      const audioFeatureB = audioFeatures[b.index][sortBy]

      return this.compare(audioFeatureA, audioFeatureB, order)
    })

    return uris.map(uriObject => uriObject.uri)
  }
}
