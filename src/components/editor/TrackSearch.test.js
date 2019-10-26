import flushPromises from 'flush-promises'
import TrackSearch from './TrackSearch.vue'
import createTestRenderer from '../../utils/testing/createTestRenderer'
import Spotify from '../../utils/Spotify'

jest.mock('../../utils/Spotify')

const testTracks = [
  {
    name: 'foo',
    uri: 'foo-uri',
    image: 'foo-image',
    artist: 'foo-artist',
    duration_ms: 3600,
  },
  {
    name: 'bar',
    uri: 'bar-uri',
    image: 'bar-image',
    artist: 'bar-artist',
    duration_ms: 3600,
  },
]

describe('TrackSearch', () => {
  beforeAll(() => {
    Spotify.searchTracks.mockResolvedValue(testTracks)
  })

  const searchForTracks = async wrapper => {
    const input = wrapper.find('input')
    input.element.value = 'foobar'
    input.trigger('input')
    await flushPromises()
  }

  const shallowMountWithVuex = createTestRenderer(TrackSearch, {
    shallow: true,
  })

  it('searches for entered input', () => {
    const { wrapper } = shallowMountWithVuex({})
    const input = wrapper.find('input')
    input.element.value = 'foobar'
    input.trigger('input')
    expect(Spotify.searchTracks).toHaveBeenCalledWith('foobar')
  })

  it('shows track items for each found track', async () => {
    const { wrapper } = shallowMountWithVuex({})

    const results = wrapper.find('.results')
    expect(results.text()).toContain('No results :(')

    await searchForTracks(wrapper)

    const tracks = wrapper.findAll('search-playlist-item-stub')
    expect(tracks).toHaveLength(2)
    tracks.wrappers.forEach((track, i) => {
      expect(track.props('track').name).toBe(testTracks[i].name)
    })
  })

  it('clicking on a track will add it to the "added" list, clicking again removes it', async () => {
    const { wrapper } = shallowMountWithVuex({})

    await searchForTracks(wrapper)

    const tracks = wrapper.findAll('search-playlist-item-stub')
    const clickIndex = 1
    const fooTrack = tracks.at(clickIndex)
    fooTrack.trigger('click')

    let addedTracks = wrapper.findAll('.add-list search-playlist-item-stub')
    expect(addedTracks).toHaveLength(1)
    expect(addedTracks.at(0).props('track').name).toBe(
      testTracks[clickIndex].name
    )

    addedTracks.at(0).trigger('click')
    addedTracks = wrapper.findAll('.add-list search-playlist-item-stub')
    expect(addedTracks).toHaveLength(0)
  })

  it('adding tracks emits their uris in a select event', async () => {
    const { wrapper } = shallowMountWithVuex({})

    await searchForTracks(wrapper)

    const tracks = wrapper.findAll('search-playlist-item-stub')
    tracks.wrappers.forEach(track => track.trigger('click'))

    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select).toHaveLength(2)

    expect(wrapper.emitted().select).toEqual([
      [['foo-uri']],
      [['foo-uri', 'bar-uri']],
    ])
  })
})
