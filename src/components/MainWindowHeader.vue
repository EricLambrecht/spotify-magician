<template>
  <div class="header">
    <b-container>
      <div class="content">
        <square-image :url="playlistImage" :size="110"/>
        <div class="playlist-meta">
          <b-headline :class="{ 'playlist-name': true, 'large': !playlistExists }">
            {{ playlistName }}
          </b-headline>
          <div class="smaller-info">
            <b-text v-if="playlistExists">{{ playlistTrackCount }} songs</b-text>
            <b-text v-if="playlistExists" >
              {{ playlistLengthMs | formatTime('h [hr.,] mm [min.]') }}
            </b-text>
          </div>
        </div>
        <playlist-selector class="selector"/>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlaylistSelector from './PlaylistSelector.vue';
import SquareImage from './SquareImage.vue';
import formatTime from '../utils/formatTime';

export default {
  name: 'MainWindowHeader',
  components: {
    SquareImage,
    PlaylistSelector,
  },
  filters: {
    formatTime,
  },
  computed: {
    ...mapGetters({
      playlistImage: 'editor/playlistImage',
      playlistName: 'editor/playlistName',
      playlistTrackCount: 'editor/playlistTrackCount',
      playlistExists: 'editor/hasPlaylist',
      playlistLengthMs: 'editor/playlistLengthMs',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .header {
    background-color: #F0F0F0;
    padding: 60px 0;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .playlist-meta {
      margin: 0 30px -1px;

      .playlist-name {
        font-size: 36px;
        &.large {
          font-size: 40px;
        }
      }

      .smaller-info {
        margin: 8px 0 0 1px;
        display: flex;
        flex-direction: row;

        font-size: 15px;
        color: #888;

        :not(:first-child) {
          &::before {
            content: '•';
            margin: 0 5px;
          }
        }
      }
    }
  }


  .selector {
    margin-left: auto;
    align-self: flex-start;
  }
</style>
