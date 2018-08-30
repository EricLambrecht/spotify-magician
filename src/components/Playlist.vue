<template>
  <b-list class="playlist" ordered>
    <template v-for="(item, index) in trackItems">
      <b-list-item
        v-if="index === 0 || item.track.first_of_hour"
        :key="item.track.relative_start_time_ms"
        class="section-headline"
      >
        {{ item.track.relative_start_time_ms | formatTime('h:mm') }} Uhr
      </b-list-item>
      <playlist-item :item="item" :key="item.track.id"/>
    </template>
  </b-list>
</template>

<script>
import PlaylistItem from './PlaylistItem.vue';
import formatTime from '../utils/formatTime';

export default {
  name: 'Playlist',
  components: { PlaylistItem },
  filters: {
    formatTime(milliseconds, format = '') {
      return formatTime(milliseconds, format);
    },
  },
  props: {
    trackItems: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
  .playlist {
    max-width: 1000px;
    margin: auto;

    .section-headline {
      margin-top: 20px;
      font-weight: bold;
    }
  }
</style>
