export default {
  modalIsOpen: state => modalName => state.openedModal === modalName,
  toastMessages: state => state.toastMessages,
  getToastMessage: state => id => state.toastMessages.find(toast => toast.id === id),
};
