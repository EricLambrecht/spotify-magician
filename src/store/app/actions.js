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

  askForConfirmation({ commit }, confirmation = {}) {
    const promise = new Promise((resolve, reject) => {
      commit('setOnConfirmationAccept', resolve);
      commit('setOnConfirmationDecline', reject);
    });

    commit('setPendingConfirmation', {
      headline: 'Please confirm',
      question: 'Are you sure you want to proceed?',
      positive: 'Yes',
      negative: 'No',
      ...confirmation,
    });
    return promise;
  },

  async acceptConfirmation({ commit, state }) {
    const { onConfirmationAccept } = state;
    onConfirmationAccept(); // resolve promise
    commit('setPendingConfirmation', null);
    commit('setOnConfirmationAccept', null);
    commit('setOnConfirmationDecline', null);
  },

  declineConfirmation({ commit, state }) {
    const { onConfirmationDecline } = state;
    onConfirmationDecline(); // reject promise
    commit('setPendingConfirmation', null);
    commit('setOnConfirmationAccept', null);
    commit('setOnConfirmationDecline', null);
  },

  updateAppWidth({ commit }, width) {
    commit('setAppWidth', width);
  },
};
