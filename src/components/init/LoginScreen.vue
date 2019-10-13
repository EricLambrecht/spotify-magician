<template>
  <div class="login-screen">
    <b-square-image :url="logoUrl" :size="140" />
    <b-headline level="1" class="app-name">
      Spotify Magician
    </b-headline>
    <b-link :href="loginURI" class="login-link">
      Please login
    </b-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import logoUrl from '../../assets/logo.png';
import config from '../../config';

const { spotify: { scopes } } = config;
const getScopes = () => scopes.map(scope => encodeURIComponent(scope)).join(' ');

export default {
  name: 'LoggedOutWindow',
  data: () => ({
    logoUrl,
  }),
  computed: {
    ...mapState('app', ['authState']),
    loginURI() {
      return `${'https://accounts.spotify.com/authorize?'
          + 'client_id='}${config.spotify.client_id}&`
          + 'response_type=code&'
          + `state=${this.authState}`
          + `scope=${getScopes()}&`
          + `redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}/init`)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .login-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    text-align: center;
    font-family: var(--font-family);

    .app-name {
      margin-bottom: 20px;
    }

    .login-link {
      font-size: 18px;
      text-decoration: none;
      transition: .1s background-color ease;
      padding: 10px;
      border-radius: 5px;

      &:hover {
        background-color: var(--color-background-grey);
      }
    }
  }
</style>
