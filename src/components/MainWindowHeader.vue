<template>
  <div class="header">
    <b-container>
      <div class="content">
        <square-image :url="playlistImage" :size="110" />
        <div class="playlist-meta">
          <b-headline :class="{ 'playlist-name': true, 'empty': !playlistExists }">
            {{ playlistName }}
            <b-button
              v-if="playlistExists"
              class="selector" 
              tertiary 
              @click="openModal('select-playlist')"
            >
              ⇆
            </b-button>
          </b-headline>
          <div class="smaller-info">
            <b-text v-if="playlistExists">
              {{ playlistTrackCount }} songs
            </b-text>
            <b-text v-if="playlistExists">
              {{ playlistLengthMs | formatTime('h [hr.,] mm [min.]') }}
            </b-text>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SquareImage from './SquareImage.vue';
import formatTime from '../utils/formatTime';

export default {
  name: 'MainWindowHeader',
  components: {
    SquareImage,
  },
  filters: {
    formatTime,
  },
  computed: {
    ...mapGetters('editor', [
      'playlistImage',
      'playlistName',
      'playlistTrackCount',
      'playlistExists',
      'playlistLengthMs',
    ]),
  },
  methods: {
    ...mapActions('app', [
      'openModal',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .header {
    background-color: white;
    padding: 60px 0;
  }

  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .playlist-meta {
      position: relative;
      margin: 0 30px -1px;

      @media screen and (max-width: 768px) {
        margin-left: 20px;
      }

      .playlist-name {
        display: flex;
        align-items: flex-end;

        font-size: var(--font-size-playlist-name);
        &.empty {
          font-size: var(--font-size-choose-playlist);
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
    margin-left: 25px;
    font-size: 32px;
    font-weight: bold;
    color: var(--spotify-green);

    position: relative;
    top: 9px;

    @media screen and (max-width: 768px) {
      font-size: 26px;
      margin-left: 5px;
      display: block;
    }
  }
</style>
