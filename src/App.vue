<template>
  <div id="app">
    <img 
      :src="logoURI" 
      width="140">
    <h1>Better Spotify Playlists (prototype, WIP)</h1>

    <a 
      v-show="!hasAccess" 
      :href="loginURI">Get access</a>
    <div v-if="hasAccess">
      <playlist-selector 
        start-time="0" 
        @select="onPlaylistSelect" 
        @error="onPlaylistError"/>

      <div v-if="playlistData">
        <h3>{{ playlistData.name }}</h3>
        <p>Start Time</p>
        <input 
          v-model="startHour" 
          type="number" 
          min="0" 
          max="24" 
          @change="onChangeTime">
        <input 
          v-model="startMinute" 
          type="number" 
          min="0" 
          max="59" 
          step="5" 
          @change="onChangeTime">
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <track-list :track-items="playlistData.tracks.items"/>
      </div>

    </div>
  </div>
</template>

<script>
import SpotifyWebApi from 'spotify-web-api-js';

import moment from 'moment';
import SpotifyTrackList from './components/SpotifyTrackList.vue';
import SpotifyPlaylistSelector from './components/SpotifyPlaylistSelector.vue';

import 'moment-duration-format';

import config from './config';

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('');

export default {
  name: 'App',
  components: {
    'track-list': SpotifyTrackList,
    'playlist-selector': SpotifyPlaylistSelector,
  },
  data() {
    return {
      hasAccess: false,
      accessToken: null,
      errorMessage: '',
      logoURI: './src/assets/logo.png',
      startHour: 18,
      startMinute: 0,
      playlistData: {
        name: '',
        tracks: {
          href: '',
          items: [],
          limit: 0,
          total: 0,
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
      console.warn(search); // eslint-disable-line no-console
      this.hasAccess = false;
    }
  },
  methods: {
    onPlaylistSelect(playlistData) {
      this.playlistData.tracks = this.getTracksWithTime(playlistData.tracks);
      this.logoURI = playlistData.images[0].url; // Replace logo with playlist image
    },

    onPlaylistError(error) {
      if (error.tokenExpired) {
        this.hasAccess = false;
      } else {
        this.errorMessage = error.message;
      }
    },

    onChangeTime() {
      if (this.playlistData) {
        this.playlistData.tracks = this.getTracksWithTime(this.playlistData.tracks);
      }
    },

    getTracksWithTime(tracks) {
      let currentTime = moment
        .duration(0)
        .add(parseInt(this.startHour, 10), 'hours')
        .add(parseInt(this.startMinute, 10), 'minutes');

      let lastHour = currentTime.hours();

      const items = tracks.items.map((item, index, arr) => {
        const modifiedItem = item;
        const modifiedTrack = modifiedItem.track;

        // Determine when the song starts (relative to the playlist's start time)
        if (index !== 0) {
          const previousTrackDuration = arr[index - 1].track.duration_ms;
          currentTime = currentTime.add(previousTrackDuration);

          modifiedTrack.first_of_hour = currentTime.hours() !== lastHour;
          lastHour = currentTime.hours();
        }
        modifiedTrack.relative_start_time_ms = currentTime.asMilliseconds();

        modifiedItem.track = modifiedTrack;
        return modifiedItem;
      });

      return {
        ...tracks,
        items,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  $spotify-green: #1DB954;
  $spotify-black: #191414;
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: $spotify-green;
  }
</style>
