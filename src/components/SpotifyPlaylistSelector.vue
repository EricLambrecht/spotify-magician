<template>
  <div class="spotify-playlist-selector">
    <div 
      v-if="mode === 'custom'" 
      class="form">
      <label 
        for="playlistURI" 
        class="label">Enter playlist URI: </label>
      <input
        id="playlistURI"
        v-model="playlistURI"
        type="text"
        class="input uri-input"
      >
      <button 
        class="fetch-button" 
        @click="fetchPlaylist">Playlist laden</button>
    </div>
    <div 
      v-else 
      class="form">
      <label 
        for="playlistId" 
        class="label">Choose a playlist: </label>
      <select 
        id="playlistId" 
        v-model="playlistId" 
        class="input select-box" 
        @change="fetchPlaylist">
        <option 
          v-for="playlist in userPlaylists"
          :key="playlist.id"
          :value="playlist.id">
          {{ playlist.name }}
        </option>
      </select>
    </div>
    <button 
      class="mode-button" 
      @click="switchMode">
      {{ mode === 'user' ? 'Enter manually' : 'Choose from your playlists' }}
    </button>
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
      playlistURI: '',
      userPlaylists: [],
      playlistId: null,
      mode: 'user',
    };
  },
  computed: {
    parsedPlaylistId() {
      // example: spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH
      const search = this.playlistURI.match(/.*user:[^\s]+:playlist:([^\s]+)/i);
      if (search === null) {
        return null;
      }
      return search[1];
    },
  },
  async mounted() {
    try {
      this.userPlaylists = await spotifyApi.getUserPlaylists();
    } catch (err) {
      this.$emit('error', { message: err.message });
    }
  },
  methods: {
    async fetchPlaylist() {
      try {
        let playlist;
        if (this.mode === 'custom') {
          playlist = await spotifyApi.getFullPlaylist(this.parsedPlaylistId);
        } else {
          playlist = await spotifyApi.getFullPlaylist(this.playlistId);
        }
        this.$emit('select', playlist); // emit event for parents (TODO: add state management)
      } catch (err) {
        if (err.message === 'Token expired') {
          this.$emit('error', { message: err.message, tokenExpired: true });
        } else {
          this.$emit('error', { message: err.message });
        }
      }
    },
    switchMode() {
      this.mode = this.mode === 'user' ? 'custom' : 'user';
    },
  },
};
</script>

<style lang="scss">
  .spotify-playlist-selector {
    .form {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .label {
        margin-right: 10px;
      }
      .input {
        padding: 5px 10px;
      }
      .select-box {
      }
      .fetch-button {
        padding: 4px 10px 5px;
        margin-left: 2px;
      }
    }
    .mode-button {
      margin-top: 5px;
    }
  }
</style>
