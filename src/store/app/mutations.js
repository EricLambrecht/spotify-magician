export default {
  setError(state, errorMessage) {
    state.error = errorMessage
  },
  setOpenedModal(state, modalNameOrNull) {
    state.openedModal = modalNameOrNull
  },
  addToast(state, toast) {
    state.toastMessages.push(toast)
  },
  removeToast(state, index) {
    state.toastMessages.splice(index, 1)
  },
  setPendingConfirmation(state, confirmation) {
    state.pendingConfirmation = { ...confirmation }
  },
  setOnConfirmationAccept(state, callback) {
    state.onConfirmationAccept = callback
  },
  setOnConfirmationDecline(state, callback) {
    state.onConfirmationDecline = callback
  },
  setAppWidth(state, width) {
    state.appWidth = width
  },
}
