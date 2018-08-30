<template>
  <b-list-item class="playlist-item">
    {{ item.track.relative_start_time_ms | formatTime('h:mm') }} -
    {{ item.track.artists[0].name }} -
    {{ item.track.name }} ({{ item.track.duration_ms | formatTime('mm:ss') }})
  </b-list-item>
</template>

<script>
import formatTime from '../utils/formatTime';

export default {
  name: 'PlaylistItem',
  filters: {
    formatTime(milliseconds, format = '') {
      return formatTime(milliseconds, format);
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .playlist-item {
    margin-top: 16px;
  }
</style>
