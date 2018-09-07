<template>
  <div class="spotify-playlist-selector">
    <div v-if="mode === 'custom'" class="form">
      <b-text-input
        id="playlistURI"
        v-model="playlistURI"
        type="text"
        class="input uri-input"
        label="Enter playlist URI:"
      />
      <b-button 
        class="fetch-button" 
        primary 
        @click="fetchPlaylist"
      >
        Playlist laden
      </b-button>
    </div>
    <div v-else class="form">
      <b-dropdown
        v-model="playlistId" 
        class="input select-box"
        @change="fetchPlaylist"
      >
        <b-dropdown-item
          v-for="playlist in userPlaylists"
          :key="playlist.id"
          :value="playlist.id"
        >
          {{ playlist.name }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <b-text class="mode-switch" @click.native="switchMode">
      {{ mode === 'user' ? 'Enter manually' : 'Choose from your playlists' }}
    </b-text>
  </div>
</template>

<script>
export default {
  name: 'PlaylistSelector',
  data() {
    return {
      playlistURI: '',
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
    userPlaylists() {
      return this.$store.state.user.playlists;
    },
  },
  mounted() {
    this.$store.dispatch('user/getPlaylists');
  },
  methods: {
    async fetchPlaylist() {
      const playlistId = this.mode === 'custom'
        ? this.parsedPlaylistId
        : this.playlistId;

      await this.$store.dispatch('editor/fetchPlaylist', playlistId);
      this.$emit('select');
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
      align-items: flex-end;

      .label {
        margin-right: 10px;
      }
      .select-box { }
      .fetch-button {
        margin-left: 4px;
      }
    }
    .mode-switch {
      display: inline-block;
      margin-top: 8px;
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
