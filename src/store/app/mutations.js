export default {
  setError(state, errorMessage) {
    state.error = errorMessage;
  },
  setOpenedModal(state, modalNameOrNull) {
    state.openedModal = modalNameOrNull;
  },
  addToast(state, toast) {
    state.toastMessages.push(toast);
  },
  removeToast(state, index) {
    state.toastMessages.splice(index, 1);
  },
};
