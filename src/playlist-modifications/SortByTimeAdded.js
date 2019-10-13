import AbstractSort from './AbstractSort'

export default class SortByTimeAdded extends AbstractSort {
  static sort(playlist, order, options) {
    const items = [...playlist.tracks.items]

    items.sort((a, b) => {
      const dateA = new Date(a.added_at)
      const dateB = new Date(b.added_at)

      return this.compare(dateA, dateB, order)
    })

    return items.map(item => item.track.uri)
  }
}
