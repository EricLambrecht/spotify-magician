export default {
  setError(state, errorMessage) {
    state.error = errorMessage;
  },
  setOpenedModal(state, modalNameOrNull) {
    state.openedModal = modalNameOrNull;
  },
};
