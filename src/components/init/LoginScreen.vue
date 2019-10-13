<template>
  <div class="login-screen">
    <init-header />
    <b-link :href="loginURI" class="login-link">
      Please login
    </b-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import logoUrl from '../../assets/logo.png'
import config from '../../config'
import InitHeader from './InitHeader'

const {
  spotify: { scopes },
} = config
const getScopes = () => scopes.map(scope => encodeURIComponent(scope)).join(' ')

export default {
  name: 'LoginScreen',
  components: { InitHeader },
  data: () => ({
    logoUrl,
  }),
  computed: {
    ...mapState('app', ['authState']),
    loginURI() {
      return (
        `https://accounts.spotify.com/authorize?client_id=${config.spotify.client_id}&` +
        'response_type=code&' +
        `state=${this.authState}` +
        `scope=${getScopes()}&` +
        `redirect_uri=${encodeURIComponent(
          `${window.location.protocol}//${window.location.host}/init`
        )}`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.login-screen {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  font-family: var(--font-family);

  .login-link {
    font-size: 18px;
    text-decoration: none;
    transition: 0.1s background-color ease;
    padding: 10px;
    border-radius: 5px;

    &:hover {
      background-color: var(--color-background-grey);
    }
  }
}
</style>
