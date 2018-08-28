<template>
  <ol class="track-list">
    <template v-for="(item, index) in trackItems">
      <li 
        :key="item.track.id" 
        class="track">
        <h4 v-if="index === 0 || item.track.first_of_hour">{{ item.track.relative_start_time_ms |
        formatTime('h:mm') }} Uhr</h4>
        <p>
          {{ item.track.relative_start_time_ms | formatTime('h:mm') }} -
          {{ item.track.artists[0].name }} -
          {{ item.track.name }} ({{ item.track.duration_ms | formatTime('mm:ss') }})
        </p>
      </li>
    </template>
  </ol>
</template>

<script>
import moment from 'moment';
import 'moment-duration-format';

export default {
  name: 'SpotifyTrackList',
  filters: {
    formatTime(milliseconds, format = '') {
      const duration = moment.duration(milliseconds);

      if (format) {
        return duration.format(format);
      }

      if (duration.days() > 0) {
        return duration.format('D h:mm');
      }
      if (duration.hours() > 0) {
        return duration.format('h:mm');
      }
        
      return duration.format('mm:ss');
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
  ol {
    list-style: none;
    text-align: left;
    padding: 0;
  }

  .track-list {
    max-width: 1000px;
    margin: auto;
  }
</style>
