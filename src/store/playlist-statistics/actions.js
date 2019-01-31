import Spotify, { api } from '../../utils/Spotify';

export default {
  async fetchPlaylistAudioFeatures({
    commit, dispatch, rootGetters,
  }) {
    commit('setFetching', true);
    try {
      const { 'editor/playlistIds': playlistIds } = rootGetters;
      const result = await api.getAudioFeaturesForTracks(playlistIds);
      commit('setPlaylistAudioFeatures', result.audio_features);
    } catch (err) {
      Spotify.handleApiError(dispatch, err);
    } finally {
      commit('setFetching', false);
    }
  },
  openPlaylistStatistics({ commit }) {
    commit('setShow', true);
  },
  closePlaylistStatistics({ commit }) {
    commit('setShow', false);
  },
  activateFeatureGraph({ commit }, featureName) {
    commit('activateFeatureGraph', featureName);
  },
  deactivateFeatureGraph({ commit }, featureName) {
    commit('deactivateFeatureGraph', featureName);
  },
};
