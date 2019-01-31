import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  fetching: false,
  playlistAudioFeatures: [],
  show: false,
  activeFeatureGraphs: [
    'danceability',
    'energy',
    'valence',
  ],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
