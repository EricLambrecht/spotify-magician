<template>
  <div id="app">
    <square-image :url="playlistImage" :size="140"/>
    <b-headline level="1">Spotify Magician</b-headline>
    <b-link v-show="!hasAccess" :href="loginURI">
      Get access
    </b-link>
    <div v-if="hasAccess">
      <playlist-selector />

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <div v-if="playlistData">
        <h3>{{ playlistData.name }}</h3>
        <start-time-settings/>
        <playlist :track-items="playlistData.tracks.items"/>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex';

import Playlist from './components/Playlist.vue';
import PlaylistSelector from './components/PlaylistSelector.vue';
import SquareImage from './components/SquareImage.vue';
import StartTimeSettings from './components/StartTimeSettings.vue';
import config from './config';

const { mapState } = createNamespacedHelpers('editor');

export default {
  name: 'App',
  components: {
    StartTimeSettings,
    SquareImage,
    Playlist,
    PlaylistSelector,
  },
  computed: {
    loginURI() {
      return `${'https://accounts.spotify.com/authorize?'
          + 'client_id='}${config.client_id}&`
          + 'response_type=token&'
          + `redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}${window.location.pathname}`)}`;
    },
    ...mapState({
      playlistData: state => state.playlist,
      startHour: state => state.startHour,
      startMinute: state => state.startMinute,
      errorMessage: state => state.errorMessage,
    }),
    ...mapGetters({
      hasAccess: 'user/hasAccess',
      playlistImage: 'editor/playlistImage',
    }),
  },
  mounted() {
    this.$store.dispatch('user/checkAccess');
  },
};
</script>

<style lang="scss" scoped>
  @import './assets/css_reset.css';

  :root {
    --spotify-green: #1DB954;
    --spotify-black: #191414;

    --color-default: #343030;
    --color-default-light: #454242;
    --color-danger: #e25451;
  }

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--color-default);
    max-width: 1000px;
    margin: 60px auto;
  }

  .error-message {
    display: block;
    font-weight: bold;
    color: var(--color-danger);
    border: 2px solid var(--color-danger);
    border-radius: 2px;
    padding: 5px 10px;
    margin: 20px 0;
  }

</style>
