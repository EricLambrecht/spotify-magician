export default {
  setPlaylist(state, playlist) {
    state.playlist = { ...playlist };
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

  setPlaylistAudioFeatures(state, audioFeatures) {
    state.playlistAudioFeatures = audioFeatures;
    state.playlistStatistics.fetching = false;
  },
  setShowPlaylistStatistics(state, showIt) {
    state.playlistStatistics.show = showIt;
  },
  setPlaylistStatisticsFetching(state, fetching) {
    state.playlistStatistics.fetching = fetching;
  },

  showTimeOfDay(state, showIt) {
    state.displayOptions.showTimeOfDay = showIt;
  },
};
