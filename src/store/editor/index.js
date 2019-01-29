import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  displayOptions: {
    showTimeOfDay: false,
    timeOfDayStartHour: 18,
    timeOfDayStartMinute: 0,
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
