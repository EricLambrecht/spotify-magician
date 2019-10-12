import Spotify from '../../utils/Spotify';
import config from '../../config';

export default {
  async requestTokens({ commit }) {
    if (typeof window === 'undefined') {
      return;
    }

    const search = window.location.search.substr(1); // remove first char (#)
    const matches = search.match(/.*code=([^&?]*)/i); // parse token
    if (matches && matches.length > 1) {
      const [, code] = matches;
      const result = await fetch(`${config.backend.host}/requestTokens`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: `${window.location.protocol}//${window.location.host}/requestTokens`,
        }),
      });
      const tokenData = await result.json();

      if (!tokenData.error) {
        const { access_token, refresh_token } = tokenData; // eslint-disable-line camelcase
        Spotify.setAccessToken(access_token);
        commit('setAccessToken', access_token);
        commit('setRefreshToken', refresh_token);
      } else {
        const errorMessage = `Error "${tokenData.error}": ${tokenData.error_description}`;
        throw new Error(errorMessage);
      }
    } else {
      const errorMessage = 'Auth tokens could not be retrieved: parameter "code" is missing.';
      throw new Error(errorMessage);
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
