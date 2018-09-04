export default {
  setPlaylist(state, playlist) {
    state.playlist = { ...playlist };
  },
  setError(state, errorMessage) {
    state.error = errorMessage;
  },
  setStartingTime(state, { startHour, startMinute }) {
    state.displayOptions.startHour = startHour;
    state.displayOptions.startMinute = startMinute;
  },
  setTrackItems(state, items) {
    if (state.playlist && state.playlist.tracks) {
      state.playlist.tracks.items = items;
    }
  },
  showStartingTime(state, showIt) {
    state.displayOptions.showStartingTime = showIt;
  },
};
