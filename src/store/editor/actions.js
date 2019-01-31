import moment from 'moment';
import Spotify, { api } from '../../utils/Spotify';
import 'moment-duration-format';

export default {
  async fetchPlaylist({
    commit, dispatch, state, rootState,
  }, playlistId) {
    try {
      Spotify.setAccessToken(rootState.user.accessToken);

      const playlist = await Spotify.getFullPlaylist(playlistId);
      commit('setPlaylist', playlist);

      dispatch('setTimeOfDayStart', {
        hour: state.displayOptions.timeOfDayStartHour,
        minute: state.displayOptions.timeOfDayStartMinute,
      });

      if (rootState.playlistStatistics.show) {
        await dispatch('playlistStatistics/fetchPlaylistAudioFeatures', null, { root: true });
      }
    } catch (err) {
      Spotify.handleApiError(dispatch, err);
    }
  },

  async appendTrackToPlaylist({ dispatch, state }, uri) {
    try {
      // const { snapshot_id } = ... TODO: we could compare snapshots to support collaboration...
      await Spotify.addTracksToPlaylist(state.playlist.id, [uri]);
      await dispatch('fetchPlaylist', state.playlist.id);
    } catch (err) {
      Spotify.handleApiError(dispatch, err);
    }
  },

  async reorderTracks({ dispatch, state }, { rangeStart, insertBefore }) {
    try {
      await api.reorderTracksInPlaylist(state.playlist.id, rangeStart, insertBefore);
      await dispatch('fetchPlaylist', state.playlist.id);
    } catch (err) {
      Spotify.handleApiError(dispatch, err);
    }
  },


  setTimeOfDayStart({ commit, state }, { hour, minute }) {
    commit('setTimeOfDayStart', { hour, minute });

    let currentTime = moment
      .duration(0)
      .add(parseInt(hour, 10), 'hours')
      .add(parseInt(minute, 10), 'minutes');

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

  showTimeOfDay({ commit }, showIt) {
    commit('showTimeOfDay', showIt);
  },

  async removeTrack({ dispatch, state }, uri) {
    try {
      await api.removeTracksFromPlaylist(state.playlist.id, [uri]);
      await dispatch('fetchPlaylist', state.playlist.id);
    } catch (err) {
      Spotify.handleApiError(dispatch, err);
    }
  },

  async replaceTracks({ dispatch, state }, uris) {
    try {
      await api.replaceTracksInPlaylist(state.playlist.id, uris);
      await dispatch('fetchPlaylist', state.playlist.id);
    } catch (err) {
      Spotify.handleApiError(dispatch, err);
    }
  },

  async rearrangePlaylistWith({ dispatch, state }, rearranger) {
    const { playlist } = state;
    const uris = rearranger.rearrange(playlist);
    return dispatch('replaceTracks', uris);
  },
};
