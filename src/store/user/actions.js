import Spotify from '../../utils/Spotify';

export default {
  checkAccess({ commit }) {
    if (typeof window === 'undefined') {
      return;
    }

    const hash = window.location.hash.substr(1); // remove first char (#)
    const search = hash.match(/.*access_token=([^&?]*)/i); // parse token

    if (search && search.length > 1) {
      const [, accessToken] = search;
      Spotify.setAccessToken(accessToken);
      commit('setAccessToken', accessToken);
    } else {
      commit('setAccessToken', null);
    }
  },
  async getPlaylists({ commit, dispatch, state }) {
    try {
      Spotify.setAccessToken(state.accessToken);
      commit('setPlaylists', await Spotify.getUserPlaylists());
    } catch (err) {
      Spotify.handleApiError(dispatch, err);
    }
  },
};
