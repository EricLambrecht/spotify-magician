import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  error: null,
  displayOptions: {
    showStartingTime: false,
    startHour: 18,
    startMinute: 0,
  },
  playlist: null,
  openedModal: null,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
