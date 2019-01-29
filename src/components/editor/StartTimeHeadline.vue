<template>
  <div>
    <b-list-item
      class="start-time-headline"
    >
      <span
        class="time"
        :contenteditable="allowEdit"
        v-text="formatTime(startTimeMs, 'hh')"
        @blur="updateHours"></span>
      <span class="colon">:</span>
      <span v-if="allowEdit" class="time" :contenteditable="allowEdit" v-text="formatTime(minutesInMilliseconds, 'mm')"></span>
      <span v-else="allowEdit" class="time">00</span>
      <span>&nbsp;</span>
      <span>Uhr</span>
      <v-icon v-if="allowEdit" name="pen" class="icon" />
    </b-list-item>
  </div>
</template>

<script>
import 'vue-awesome/icons/pen';
import { mapActions } from 'vuex';
import formatTime, { getHours, getMinutes } from '../../utils/formatTime';

export default {
  name: 'StartTimeHeadline',
  props: {
    startTimeMs: {
      type: Number,
      required: true,
    },
    allowEdit: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    hours() {
      return getHours(this.startTimeMs);
    },
    minutes() {
      return getMinutes(this.startTimeMs);
    },
    minutesInMilliseconds() {
      return this.minutes * 60000;
    }
  },
  methods: {
    formatTime,
    ...mapActions('editor', [
      'setStartingTime',
    ]),
    updateHours(e) {
      console.log('e:', Number.parseInt(e.target.textContent));
    },
    onChangeTime() {
      this.setStartingTime({ startHour: this.startHour, startMinute: this.startMinute });
    },
  },

};
</script>

<style lang="scss" scoped>
  .start-time-headline {
    margin-top: 30px;
    margin-bottom: 15px;

    font-size: 0;
    padding: 0;

    > * {
      color: #ababab;
      font-size: 32px;
      font-weight: bold;
    }
  }

  .icon {
    font-size: 22px;
    margin-left: 5px;
    margin-bottom: 1px;
  }
</style>
