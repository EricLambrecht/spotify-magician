<template>
  <div id="app">
    <img :src="logoURI" width="140">
    <h1>Better Spotify Playlists (prototype, WIP)</h1>

    <a v-show="!hasAccess" :href="loginURI">Get access</a>
    <div v-if="hasAccess">
      <label for="playlistURI">Enter Playlist URI: </label>
      <input v-model="playlistURI" type="text" id="playlistURI"/>
      <button v-on:click="fetchPlaylist">Playlist suchen</button>

      <div v-if="playlistData">
        <h3>{{playlistData.name}}</h3>
        <ol class="tracks">
          <template v-for="(item, index) in playlistData.tracks.items">
             <li class="track">
               <h4 v-if="index === 0 || item.track.first_of_hour">{{item.track.relative_start_time_ms | formatTime}} Uhr</h4>
               <p>{{item.track.relative_start_time_ms  | formatTime}} - {{item.track.artists[0].name}} - {{ item.track.name }} ({{item.track.duration_ms | formatTime}})</p>
             </li>
          </template>
        </ol>
      </div>

    </div>
  </div>
</template>

<script>
import * as SpotifyWebApi from 'spotify-web-api-js';

import moment from 'moment';
import 'moment-duration-format';

import config from './config.js';

let s = new SpotifyWebApi();
s.setAccessToken('')

export default {
  name: 'app',
  data () {
    return {
      hasAccess: false,
      accessToken: null,
      playlistURI: "spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH",
      logoURI: "/src/assets/logo.png",
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
  filters: {
    formatTime (milliseconds) {
      const duration = moment.duration(milliseconds);

      if(duration.days() > 0) {
        return duration.format('D h:mm');
      }
      else if(duration.hours() > 0) {
        return duration.format('h:mm');
      }
      else {
        return duration.format('mm:ss');
      }
    }
  },
  computed: {
    loginURI () {
      return 'https://accounts.spotify.com/authorize?' +
        'client_id=' + config.client_id + '&' +
        'response_type=token&' +
        'redirect_uri=' + encodeURIComponent(location.protocol + '//' + location.host + '/');
    },
    playlistURIData() {
      // example: spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH
      const search = this.playlistURI.match(/.*user:([\d]+):playlist:(.+)/i);
      return {
        userId: search[1] ? search[1] : "",
        id: search[2] ? search[2] : "",
      };
    }
  },
  methods: {
    fetchPlaylist () {
      s.getPlaylist(this.playlistURIData.userId, this.playlistURIData.id)
        .then((data) => {
          // Prepare the tracks before we store them
          data.tracks = this.parseTracks(data.tracks);
          // Save data in order to display the playlist
          this.playlistData = data;
          // Set logo to playlist image
          this.logoURI = this.playlistData.images[0].url;
        }, (err) => {
          const res = JSON.parse(err.response);

          // See if access token expired
          if(res.error && res.error.status === 401) {
            this.hasAccess = false;
          }
          else {
            console.error(res);
          }
        });
    },
    getTotalTime (index) {
      if(index == 0) {
        return this.playlistData.tracks.items[0].track.duration_ms;
      }
      else {
        return this.playlistData.tracks.items[index].track.duration_ms + this.getTotalTime(index - 1);
      }
    },
    parseTracks(tracks) {
      const startTime = moment.duration(50400000).add(5, 'hours'); // 14 Stunden (14 Uhr)
      let _currentTime = moment.duration(50400000).add(5, 'hours');
      let _lastHour = _currentTime.hours();

      tracks.items = tracks.items.map((item, index, arr) => {
        let modifiedItem = item;
        let modifiedTrack = modifiedItem.track;

        // Determine when the song start (relative to the playlist's start time)
        if(index === 0) {
          modifiedTrack.relative_start_time_ms = startTime.asMilliseconds();
        }
        else {
          const previousTrackDuration = arr[index - 1].track.duration_ms;

          // increase current time
          _currentTime = _currentTime.add(previousTrackDuration);

          // see if this is the first track of the hour
          if(_currentTime.hours() !== _lastHour) {
            modifiedTrack.first_of_hour = true;
          }
          else {
            modifiedTrack.first_of_hour = false;
          }

          // set relative start time
          modifiedTrack.relative_start_time_ms = _currentTime.asMilliseconds();

          // save current hour
          _lastHour = _currentTime.hours();
        }

        // save and return
        modifiedItem.track = modifiedTrack;
        return modifiedItem;
      });

      console.log(tracks);
      return tracks;
    }
  },
  mounted () {
    const hash = location.hash.substr(1); // .*access_token=([^&?]*)
    const search =  hash.match(/.*access_token=([^&?]*)/i);
    if(search.length > 1) {
      this.hasAccess = true;
      this.accessToken = search[1];
      s.setAccessToken(this.accessToken);
    }
    else {
      console.warn(search);
      this.hasAccess = false;
    }
  }
}
</script>

<style lang="scss">
$spotify-green: #1DB954;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ol {
  list-style: none;
  text-align: left;
}

.tracks {
  max-width: 1000px;
  margin: auto;
}

a {
  color: $spotify-green;
}
</style>
