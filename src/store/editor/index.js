import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  error: null,
  playlist: null,
  startHour: 18,
  startMinute: 0,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
