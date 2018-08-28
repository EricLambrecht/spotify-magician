<template>
  <div class="spotify-playlist-selector">
    <label for="playlistURI">Enter Playlist URI: </label>
    <input 
      id="playlistURI" 
      v-model="playlistURI" 
      type="text">
    <button @click="fetchPlaylist">Playlist suchen</button>
  </div>
</template>

<script>
import 'moment-duration-format';
import SpotifyApi from '../utils/SpotifyApi';

const spotifyApi = new SpotifyApi();

export default {
  name: 'SpotifyPlaylistSelector',
  data() {
    return {
      playlistURI: 'spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH',
    };
  },
  computed: {
    playlistId() {
      // example: spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH
      const search = this.playlistURI.match(/.*user:[^\s]+:playlist:([^\s]+)/i);
      if (search === null) {
        return null;
      }
      return search[1];
    },
  },
  methods: {
    async fetchPlaylist() {
      try {
        const data = await spotifyApi.getFullPlaylist(this.playlistId);
        this.$emit('select', data); // emit event for parents (TODO: add state management)
      } catch (err) {
        if (err.message === 'Token expired') {
          this.$emit('error', { message: err.message, tokenExpired: true });
        } else {
          this.$emit('error', { message: err.message });
        }
      }
    },
  },
};
</script>

<style lang="scss">

</style>
