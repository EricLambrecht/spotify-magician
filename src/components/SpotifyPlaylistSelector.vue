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

  let s = new SpotifyWebApi();
  s.setAccessToken('');

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
      getTracks(offset = 0, limit = 0) {
        // Do we have all tracks?
        return s.getPlaylistTracks(this.playlistId, {
          limit: limit,
          offset: offset
        }).then((tracks) => {
          console.log("getPlaylistTracks", tracks);
          const fetchedTracks = tracks.items.length + tracks.offset;
          if (fetchedTracks < tracks.total) {
            this.getTracks(fetchedTracks, 100).then((remainingTracks) => {
              tracks.items = tracks.items.concat(remainingTracks.items);
            }).catch((err) => {
              console.warn(err);
            });
          }
          return Promise.resolve(tracks);
        })
      },
      fetchPlaylist() {
        console.log('this.playlistId', this.playlistId);
        s.getPlaylist(this.playlistId)
          .then((data) => {

            // Do we have all tracks?
            const fetchedTracks = data.tracks.items.length + data.tracks.offset;
            if (fetchedTracks < data.tracks.total) {
              this.getTracks(fetchedTracks, 100).then((remainingTracks) => {
                data.tracks.items = data.tracks.items.concat(remainingTracks.items);
                // Emit event for parents...
                this.$emit('select', data);
              }).catch((err) => {
                console.warn(err);
              });
            }
            else {
              // Emit event for parents...
              this.$emit('select', data);
            }
          }, (err) => {
            console.log('err', err);
            const res = JSON.parse(err.response);

            // See if access token expired
            if (res.error && res.error.status === 401) {
              this.$emit('error', {message: "Token expired", tokenExpired: true});
            }
            else {
              console.warn(res);
              this.$emit('error', {message: "An unknown error occured"});
            }
          });
      },
    },
  }
</script>

<style lang="scss">

</style>
