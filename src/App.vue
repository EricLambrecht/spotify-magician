<template>
  <div id="app">
    <square-image :url="playlistImage" :size="140"/>
    <b-headline level="1">Spotify Magician</b-headline>
    <b-link v-show="!hasAccess" :href="loginURI">
      Get access
    </b-link>
    <div v-if="hasAccess">
      <playlist-selector 
        start-time="0" 
        @select="onPlaylistSelect" 
        @error="onPlaylistError"
      />

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <div v-if="playlistData">
        <h3>{{ playlistData.name }}</h3>
        <start-time-settings :on-change-time="onChangeTime"/>
        <track-list :track-items="playlistData.tracks.items"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import SpotifyTrackList from './components/SpotifyTrackList.vue';
import SpotifyPlaylistSelector from './components/SpotifyPlaylistSelector.vue';
import SquareImage from './components/SquareImage.vue';
import StartTimeSettings from './components/StartTimeSettings.vue';
import SpotifyApi from './utils/SpotifyApi';
import config from './config';

import 'moment-duration-format';

const spotifyApi = new SpotifyApi();

export default {
  name: 'App',
  components: {
    StartTimeSettings,
    SquareImage,
    'track-list': SpotifyTrackList,
    'playlist-selector': SpotifyPlaylistSelector,
  },
  data() {
    return {
      hasAccess: false,
      accessToken: null,
      errorMessage: '',
      playlistImage: null,
      startHour: 18,
      startMinute: 0,
      playlistData: {
        name: '',
        tracks: {
          items: [],
        },
        images: [],
      },
    };
  },
  computed: {
    loginURI() {
      return `${'https://accounts.spotify.com/authorize?'
          + 'client_id='}${config.client_id}&`
          + 'response_type=token&'
          + `redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}${window.location.pathname}`)}`;
    },
  },
  mounted() {
    const hash = window.location.hash.substr(1); // .*access_token=([^&?]*)
    const search = hash.match(/.*access_token=([^&?]*)/i);
    if (search && search.length > 1) {
      const [, accessToken] = search;
      this.hasAccess = true;
      this.accessToken = accessToken;
      spotifyApi.setAccessToken(this.accessToken);
    } else {
      this.hasAccess = false;
    }
  },
  methods: {
    onPlaylistSelect(playlistData) {
      this.playlistData.tracks.items = this.getTrackItemsWithTime(playlistData.tracks.items);
      this.playlistImage = playlistData.images[0].url; // Replace logo with playlist image
      this.errorMessage = '';
    },

    onPlaylistError(error) {
      if (error.tokenExpired) {
        this.hasAccess = false;
      } else {
        this.errorMessage = error.message;
      }
      this.playlistImage = null;
      this.playlistData = {
        name: '',
        tracks: {
          items: [],
        },
        images: [],
      };
    },

    onChangeTime(startHour, startMinute) {
      this.startHour = startHour;
      this.startMinute = startMinute;
      if (this.playlistData) {
        this.playlistData.tracks.items = this.getTrackItemsWithTime(this.playlistData.tracks.items);
      }
    },

    getTrackItemsWithTime(trackItems) {
      let currentTime = moment
        .duration(0)
        .add(parseInt(this.startHour, 10), 'hours')
        .add(parseInt(this.startMinute, 10), 'minutes');

      let lastHour = currentTime.hours();

      return trackItems.map((item, index, arr) => {
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
    },
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
