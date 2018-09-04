import moment from 'moment';
import SpotifyApi from '../../utils/SpotifyApi';
import 'moment-duration-format';

const spotifyApi = new SpotifyApi();

export default {
  async fetchPlaylist({
    commit, dispatch, state, rootState, 
  }, playlistId) {
    try {
      spotifyApi.setAccessToken(rootState.user.accessToken);
      const playlist = await spotifyApi.getFullPlaylist(playlistId);
      commit('setPlaylist', playlist);
      dispatch('setStartingTime', {
        startHour: state.displayOptions.startHour,
        startMinute: state.displayOptions.startMinute,
      });
    } catch (err) {
      dispatch('setError', err.message);
    }
  },
  setError({ commit }, errorMessage) {
    if (errorMessage === 'Token expired') {
      commit('user/setAccessToken', null, { root: true });
    }
    commit('setError', errorMessage);
  },
  setStartingTime({ commit, state }, { startHour, startMinute }) {
    commit('setStartingTime', { startHour, startMinute });

    let currentTime = moment
      .duration(0)
      .add(parseInt(startHour, 10), 'hours')
      .add(parseInt(startMinute, 10), 'minutes');

    let lastHour = currentTime.hours();

    const trackItems = state.playlist.tracks.items.map((item, index, arr) => {
      const { track } = item;

      // Determine when the song starts (relative to the playlist's start time)
      if (index !== 0) {
        const previousTrackDuration = arr[index - 1].track.duration_ms;
        currentTime = currentTime.add(previousTrackDuration);

        track.first_of_hour = currentTime.hours() !== lastHour;
        lastHour = currentTime.hours();
      }
      track.relative_start_time_ms = currentTime.asMilliseconds();

      return {
        ...item,
        track,
      };
    });
    commit('setTrackItems', trackItems);
  },
  showStartingTime({ commit }, showIt) {
    commit('showStartingTime', showIt);
  },
};
