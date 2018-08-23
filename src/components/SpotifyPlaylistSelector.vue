<template>
  <div class="spotify-playlist-selector">
    <label for="playlistURI">Enter Playlist URI: </label>
    <input v-model="playlistURI" type="text" id="playlistURI"/>
    <button v-on:click="fetchPlaylist">Playlist suchen</button>
  </div>
</template>

<script>
  import SpotifyWebApi from 'spotify-web-api-js';

  import 'moment-duration-format';

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken('');

  export default {
    name: 'spotify-playlist-selector',
    data() {
      return {
        playlistURI: "spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH",
      }
    },
    computed: {
      playlistId() {
        // example: spotify:user:1127316932:playlist:0pLfNXXyU21MWIv0tP3hwH
        const search = this.playlistURI.match(/.*user:[^\s]+:playlist:([^\s]+)/i);
        if (search === null) {
          return null;
        }
        return search[1];
      }
    },
    methods: {
      async getTracks(offset = 0, limit = 0) {
        try {
          const tracks = await spotifyApi.getPlaylistTracks(this.playlistId, {
            limit: limit,
            offset: offset
          });
          const numberOfFetchedTracks = tracks.items.length + tracks.offset;
          if (numberOfFetchedTracks < tracks.total) {
            try {
              const remainingTracks = await this.getTracks(numberOfFetchedTracks, 100);
              tracks.items = tracks.items.concat(remainingTracks.items);
            } catch (err) {
              console.error(err);
            }
          }
          return tracks;
        } catch (err) {
          console.error(err);
        }
      },
      async fetchPlaylist() {
        try {
          const data = await spotifyApi.getPlaylist(this.playlistId);

          // Do we have all tracks?
          const numberOfFetchedTracks = data.tracks.items.length + data.tracks.offset;
          if (numberOfFetchedTracks < data.tracks.total) {
            try {
            const remainingTracks = await this.getTracks(numberOfFetchedTracks, 100);
              data.tracks.items = data.tracks.items.concat(remainingTracks.items);
              this.$emit('select', data); // emit event for parents (TODO: add state management)
            } catch (err) {
              console.error(err);
            }
          }
          else {
            // Emit event for parents...
            this.$emit('select', data);
          }
        }
        catch (err) {
          const res = JSON.parse(err.response);

          // See if access token expired
          if (res.error && res.error.status === 401) {
            this.$emit('error', {message: "Token expired", tokenExpired: true});
          }
          else {
            console.warn(res);
            this.$emit('error', {message: "An unknown error occured"});
          }
        }
      },
    },
  }
</script>

<style lang="scss">

</style>
