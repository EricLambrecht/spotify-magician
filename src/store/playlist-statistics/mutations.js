export default {
  setPlaylistAudioFeatures(state, audioFeatures) {
    state.playlistAudioFeatures = audioFeatures
    state.fetching = false
  },
  setShow(state, showIt) {
    state.show = showIt
  },
  setFetching(state, fetching) {
    state.fetching = fetching
  },
  activateFeatureGraph(state, featureName) {
    state.activeFeatureGraphs = [featureName, ...state.activeFeatureGraphs]
  },
  deactivateFeatureGraph(state, featureName) {
    state.activeFeatureGraphs = state.activeFeatureGraphs.filter(
      feature => feature !== featureName
    )
  },
}
