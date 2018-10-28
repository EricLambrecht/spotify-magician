export default {
  playlist: state => state.playlist || {
    description: '',
    href: '',
    images: [],
    public: false,
    id: null,
    tracks: {
      items: [],
      total: 0,
    },
  },
  playlistExists: (state, getters) => getters.playlist.href !== '',
  playlistImage: (state, getters) => {
    if (getters.playlist.images.length === 0) {
      return './src/assets/logo.png';
    }
    return state.playlist.images[0].url;
  },
  playlistName: (state, getters) => getters.playlist.name || 'Choose playlist',
  playlistItems: (state, getters) => getters.playlist.tracks.items.map(
    (item, i) => ({ ...item, _uniqueId: `${i}-${item.track.id}` }),
  ),
  playlistUris: (state, getters) => getters.playlistItems.map(
    item => item.track.uri,
  ),
  playlistIds: (state, getters) => getters.playlistItems.map(
    item => item.track.id,
  ),
  playlistTrackCount: (state, getters) => getters.playlist.tracks.total,
  playlistLengthMs: (state, getters) => getters.playlist.tracks.items.reduce(
    (total, item) => total + item.track.duration_ms,
    0,
  ),
  getAudioFeature: state => featureName => state.playlistAudioFeatures.map(
    feature => feature[featureName],
  ),
};
