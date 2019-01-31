export default {
  getAudioFeature: state => featureName => state.playlistAudioFeatures.map(
    feature => feature[featureName],
  ),
  getAudioFeatureWithName:
    (state, getters, rootState, rootGetters) => featureName => state.playlistAudioFeatures.map(
      feature => (
        {
          data: feature[featureName],
          name: rootGetters['editor/playlistTrackNamesById'][feature.id],
        }
      ),
    )
  ,
};
