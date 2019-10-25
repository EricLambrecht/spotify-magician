import Spotify from '../../utils/Spotify'
import config from '../../config'

export default {
  async requestToken({ commit }) {
    if (typeof window === 'undefined') {
      return
    }

    let result
    const search = window.location.search.substr(1) // remove first char (#)
    const matches = search.match(/.*code=([^&?]*)/i) // parse token
    if (matches && matches.length > 1) {
      const [, code] = matches
      result = await fetch(`${config.backend.host}/requestToken`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: `${window.location.protocol}//${window.location.host}/init`,
        }),
      })
    } else {
      result = await fetch(`${config.backend.host}/requestToken`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    if (result.status === 400) {
      const error = new Error('No refresh token')
      error.trigger_login = true
      throw error
    }

    if (result.status === 401) {
      const error = new Error('Invalid grant / Unauthorized')
      error.trigger_login = true
      throw error
    }

    const tokenData = await result.json()

    if (!tokenData.error) {
      const { access_token } = tokenData // eslint-disable-line camelcase
      Spotify.setAccessToken(access_token)
      commit('setAccessToken', access_token)
    } else {
      const errorMessage = `Error "${tokenData.error}": ${tokenData.error_description}`
      throw new Error(errorMessage)
    }
  },
  async getPlaylists({ commit, dispatch, state }) {
    try {
      Spotify.setAccessToken(state.accessToken)
      commit('setPlaylists', await Spotify.getUserPlaylists())
    } catch (err) {
      Spotify.handleApiError(dispatch, err)
    }
  },
}
