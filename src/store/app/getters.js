export default {
  modalIsOpen: state => modalName => state.openedModal === modalName,
  confirmationIsPending: state => Object.keys(state.pendingConfirmation).length !== 0,
  pendingConfirmation: state => state.pendingConfirmation,
  toastMessages: state => state.toastMessages,
  getToastMessage: state => id => state.toastMessages.find(toast => toast.id === id),
  appWidth: state => state.appWidth,
};
