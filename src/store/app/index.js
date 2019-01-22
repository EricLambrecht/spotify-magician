import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// initial state
const state = {
  error: null,
  openedModal: null,
  toastMessages: [],
  pendingConfirmation: {},
  onConfirmationAccept: null,
  onConfirmationDecline: null,
  appWidth: 0,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
