<template>
  <b-list class="playlist" ordered>
    <template v-for="(item, index) in playlistItems">
      <b-list-item
        v-if="index === 0 || item.track.first_of_hour"
        v-show="showStartingTime"
        :key="item.track.relative_start_time_ms"
        class="section-headline"
      >
        {{ item.track.relative_start_time_ms | formatTime('h:mm') }} Uhr
      </b-list-item>
      <editor-playlist-item
        :item="item"
        :position="index+1"
        :key="item.track.id"
      />
    </template>
  </b-list>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import EditorPlaylistItem from './EditorPlaylistItem.vue';
import formatTime from '../utils/formatTime';

export default {
  name: 'EditorPlaylist',
  components: { EditorPlaylistItem },
  filters: {
    formatTime(milliseconds, format = '') {
      return formatTime(milliseconds, format);
    },
  },
  computed: {
    ...mapState('editor', {
      showStartingTime: state => state.showStartingTime,
    }),
    ...mapGetters({
      playlistItems: 'editor/playlistItems',
    }),
  },
};
</script>

<style lang="scss">
  .playlist {
    max-width: 1000px;
    margin: auto;

    .section-headline {
      margin-top: 20px;
      margin-bottom: 12px;
      font-weight: bold;
    }
  }
</style>
