export default {
  setPlaylist(state, playlist) {
    state.playlist = { ...playlist }
  },

  setTimeOfDayStart(state, { hour, minute }) {
    state.displayOptions.timeOfDayStartHour = hour
    state.displayOptions.timeOfDayStartMinute = minute
  },
  setTrackItems(state, items) {
    if (state.playlist && state.playlist.tracks) {
      state.playlist.tracks.items = items
    }
  },

  showTimeOfDay(state, newValue) {
    state.displayOptions.showTimeOfDay = newValue
  },

  showTempo(state, newValue) {
    state.displayOptions.showTempo = newValue
  },
}
