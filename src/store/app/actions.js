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

  addToast({ commit, dispatch }, { message, type, dismissible }) {
    // Generate a unique id
    const id = Math.random().toString(36).substr(2, 9);

    commit('addToast', {
      id, message, type, dismissible, 
    });

    // Dismiss this toast automatically after 3 seconds if it's not dismissible
    if (typeof dismissible === 'undefined' || dismissible === false) {
      setTimeout(() => dispatch('removeToast', id), 3000);
    }

    return id;
  },

  removeToast({ commit, state }, id) {
    const index = state.toastMessages.findIndex(toast => toast.id === id);
    if (index >= 0) {
      commit('removeToast', index);
    } else {
      console.error('could not remove toast message', id); // eslint-disable-line no-console
    }
  },
};
