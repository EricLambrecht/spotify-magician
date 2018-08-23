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
        <track-list :track-items="playlistData.tracks.items"/>
      </div>

    </div>
  </div>
</template>

<script>
  import SpotifyWebApi from 'spotify-web-api-js';

  import SpotifyTrackList from "./components/SpotifyTrackList.vue";
  import SpotifyPlaylistSelector from "./components/SpotifyPlaylistSelector.vue";

  import moment from 'moment';
  import 'moment-duration-format';

  import config from './config.js';

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken('');

  export default {
    name: 'App',
    components: {
      'track-list': SpotifyTrackList,
      'playlist-selector': SpotifyPlaylistSelector
    },
    data() {
      return {
        hasAccess: false,
        accessToken: null,
        logoURI: "./src/assets/logo.png",
        startHour: 18,
        startMinute: 0,
        playlistData: {
          name: "",
          tracks: {
            href: "",
            items: [],
            limit: 0,
            total: 0
          },
          images: [],
        }
      }
    },
    computed: {
      loginURI() {
        return 'https://accounts.spotify.com/authorize?' +
          'client_id=' + config.client_id + '&' +
          'response_type=token&' +
          'redirect_uri=' + encodeURIComponent(location.protocol + '//' + location.host + location.pathname);
      }
    },
    mounted() {
      const hash = location.hash.substr(1); // .*access_token=([^&?]*)
      const search = hash.match(/.*access_token=([^&?]*)/i);
      if (search && search.length > 1) {
        this.hasAccess = true;
        this.accessToken = search[1];
        spotifyApi.setAccessToken(this.accessToken);
      }
      else {
        console.warn(search); // eslint-disable-line no-console
        this.hasAccess = false;
      }
    },
    methods: {
      onPlaylistSelect(playlistData) {
        playlistData.tracks = this.parseTracks(playlistData.tracks);
        this.playlistData = playlistData;
        this.logoURI = playlistData.images[0].url; // Replace logo with playlist image
      },

      onPlaylistError(error) {
        if (error.tokenExpired) {
          this.hasAccess = false;
        }
      },

      onChangeTime() {
        if (this.playlistData) {
          this.playlistData.tracks = this.parseTracks(this.playlistData.tracks);
        }
      },

      parseTracks(tracks) {
        let currentTime = moment
          .duration(0)
          .add(parseInt(this.startHour), 'hours')
          .add(parseInt(this.startMinute), 'minutes');

        let lastHour = currentTime.hours();

        tracks.items = tracks.items.map((item, index, arr) => {
          const modifiedItem = item;
          const modifiedTrack = modifiedItem.track;

          // Determine when the song start (relative to the playlist's start time)
          if (index === 0) {
            modifiedTrack.relative_start_time_ms = currentTime.asMilliseconds();
          }
          else {
            const previousTrackDuration = arr[index - 1].track.duration_ms;

            // increase current time
            currentTime = currentTime.add(previousTrackDuration);

            // see if this is the first track of the hour
            if (currentTime.hours() !== lastHour) {
              modifiedTrack.first_of_hour = true;
            }
            else {
              modifiedTrack.first_of_hour = false;
            }

            // set relative start time
            modifiedTrack.relative_start_time_ms = currentTime.asMilliseconds();

            // save current hour
            lastHour = currentTime.hours();
          }

          // save and return
          modifiedItem.track = modifiedTrack;
          return modifiedItem;
        });

        return tracks;
      }
    },
  }
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
