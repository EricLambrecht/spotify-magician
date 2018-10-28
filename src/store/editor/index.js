import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  displayOptions: {
    showStartingTime: false,
    startHour: 18,
    startMinute: 0,
  },
  playlist: null,
  playlistAudioFeatures: null,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
