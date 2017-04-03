<template>
  <ol class="track-list">
    <template v-for="(item, index) in trackItems">
       <li class="track">
         <h4 v-if="index === 0 || item.track.first_of_hour">{{item.track.relative_start_time_ms | formatTime}} Uhr</h4>
         <p>{{item.track.relative_start_time_ms  | formatTime}} - {{item.track.artists[0].name}} - {{ item.track.name }} ({{item.track.duration_ms | formatTime}})</p>
       </li>
    </template>
  </ol>
</template>

<script>
import moment from 'moment';
import 'moment-duration-format';

export default {
  name: 'spotify-track-list',
  props: ['trackItems'],
  filters: {
    formatTime (milliseconds) {
      const duration = moment.duration(milliseconds);

      if(duration.days() > 0) {
        return duration.format('D h:mm');
      }
      else if(duration.hours() > 0) {
        return duration.format('h:mm');
      }
      else {
        return duration.format('mm:ss');
      }
    }
  },
}
</script>

<style lang="scss">
  $spotify-green: #1DB954;
  $spotify-black: #191414;

  ol {
    list-style: none;
    text-align: left;
  }

  .track-list {
    max-width: 1000px;
    margin: auto;
  }
</style>
