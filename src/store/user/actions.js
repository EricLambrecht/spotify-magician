import SpotifyApi from '../../utils/SpotifyApi';

const spotifyApi = new SpotifyApi();

export default {
  checkAccess({ commit }) {
    if (typeof window === 'undefined') {
      return;
    }

    const hash = window.location.hash.substr(1); // remove first char (#)
    const search = hash.match(/.*access_token=([^&?]*)/i); // parse token

    if (search && search.length > 1) {
      const [, accessToken] = search;
      spotifyApi.setAccessToken(this.accessToken);
      commit('setAccessToken', accessToken);
    } else {
      commit('setAccessToken', null);
    }
  },
  async getPlaylists({ commit, state }) {
    try {
      spotifyApi.setAccessToken(state.accessToken);
      commit('setPlaylists', await spotifyApi.getUserPlaylists());
    } catch (err) {
      commit('setError', err.message);
    }
  },
};
