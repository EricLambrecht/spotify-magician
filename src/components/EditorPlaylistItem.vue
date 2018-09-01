<template>
  <b-list-item class="playlist-item">
    <b-text v-if="showStartingTime">
      {{ item.track.relative_start_time_ms | formatTime('h:mm') }} -
    </b-text>
    <b-text>
      {{ item.track.artists[0].name }}
    </b-text>
    -
    <b-text>
      {{ item.track.name }}
    </b-text>
    <b-text>
      ({{ item.track.duration_ms | formatTime('mm:ss') }})
    </b-text>
  </b-list-item>
</template>

<script>
import { mapState } from 'vuex';
import formatTime from '../utils/formatTime';

export default {
  name: 'EditorPlaylistItem',
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
    position: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('editor', {
      showStartingTime: state => state.showStartingTime,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .playlist-item {
    width: 100%;
    padding: 15px;
    position: relative;
    left: -15px;

    margin-top: 2px;
    border-radius: 5px;

    &:hover {
      background-color: #F0F0F0;
      cursor: pointer;
    }
  }
</style>
