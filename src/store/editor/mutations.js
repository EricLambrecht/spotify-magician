export default {
  setPlaylist(state, playlist) {
    state.playlist = { ...playlist };
  },
  setPlaylistAudioFeatures(state, audioFeatures) {
    state.playlistAudioFeatures = audioFeatures;
  },
  setTimeOfDayStart(state, { hour, minute }) {
    state.displayOptions.timeOfDayStartHour = hour;
    state.displayOptions.timeOfDayStartMinute = minute;
  },
  setTrackItems(state, items) {
    if (state.playlist && state.playlist.tracks) {
      state.playlist.tracks.items = items;
    }
  },
  showTimeOfDay(state, showIt) {
    state.displayOptions.showTimeOfDay = showIt;
  },
};
