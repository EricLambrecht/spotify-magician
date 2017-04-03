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
s.setAccessToken('');

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
  },
}
</script>

<style lang="scss">
  $spotify-green: #1DB954;
  $spotify-black: #191414;
</style>
