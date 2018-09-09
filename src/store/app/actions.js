export default {
  setError({ commit }, errorMessage) {
    if (errorMessage === 'Token expired') {
      commit('user/setAccessToken', null, { root: true });
    }
    commit('setError', errorMessage);
  },
  
  openModal({ commit }, modalName) {
    commit('setOpenedModal', modalName);
  },
  
  closeModal({ commit }) {
    commit('setOpenedModal', null);
  },
};
