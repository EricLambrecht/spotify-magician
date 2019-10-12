import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  accessToken: null,
  refreshToken: null,
  playlists: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
