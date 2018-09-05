<template>
  <div class="logged-out-window">
    <square-image :url="'./src/assets/logo.png'" :size="140"/>
    <b-headline level="1">Spotify Magician</b-headline>
    <b-link :href="loginURI">
      Get access
    </b-link>
  </div>
</template>

<script>
import SquareImage from './SquareImage.vue';
import config from '../config';

const scopes = ['playlist-modify-public'];
const getScopes = () => scopes.map(scope => encodeURIComponent(scope)).join(' ');

export default {
  name: 'LoggedOutWindow',
  components: {
    SquareImage,
  },
  computed: {
    loginURI() {
      return `${'https://accounts.spotify.com/authorize?'
        + 'client_id='}${config.client_id}&`
        + 'response_type=token&'
        + `scope=${getScopes()}&`
        + `redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}${window.location.pathname}`)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .logged-out-window {
    text-align: center;
  }
</style>
