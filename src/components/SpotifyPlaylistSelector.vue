<template>
  <div class="spotify-playlist-selector">
    <label for="playlistURI">Enter Playlist URI: </label>
    <input v-model="playlistURI" type="text" id="playlistURI"/>
    <button v-on:click="fetchPlaylist">Playlist suchen</button>
  </div>
</template>

<script>
import * as SpotifyWebApi from 'spotify-web-api-js';

import moment from 'moment';
import 'moment-duration-format';

let s = new SpotifyWebApi();
s.setAccessToken('')

export default {
  name: 'spotify-playlist-selector',
  data () {
    return {
      playlistURI: "spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH",
    }
  },
  computed: {
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
          // Emit event for parents...
          this.$emit('select', data);
        }, (err) => {
          const res = JSON.parse(err.response);



          // See if access token expired
          if(res.error && res.error.status === 401) {
            this.$emit('error', {message: "Token expired"});
          }
          else {
            console.error(res);
            this.$emit('error', {message: "An unknown error occured"});
          }
        });
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

      return tracks;
    }
  },
}
</script>

<style lang="scss">
  $spotify-green: #1DB954;
  $spotify-black: #191414;
</style>
