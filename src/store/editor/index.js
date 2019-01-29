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
  playlistStatistics: {
    show: false,
    fetching: false,
  },
  playlist: null,
  playlistAudioFeatures: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
