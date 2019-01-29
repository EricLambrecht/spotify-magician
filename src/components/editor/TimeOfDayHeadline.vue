<template>
  <div>
    <b-list-item
      class="time-of-day-headline"
    >
      <input
        v-if="allowEdit"
        class="time input"
        :value="inputHour"
        @input="updateHour"
        @blur="inputHour = padNumber(inputHour)"
      >
      <span v-else class="time">{{ hours }}</span> <!-- eslint-disable-line -->
      <span class="colon">:</span> <!-- eslint-disable-line -->
      <input
        v-if="allowEdit"
        class="time input"
        :value="inputMinute"
        @input="updateMinute"
        @blur="inputMinute = padNumber(inputMinute)"
      >
      <span v-else class="time">00</span> <!-- eslint-disable-line -->
      <span>&nbsp;</span>
      <span>Uhr</span>
      <v-icon
        v-if="allowEdit"
        name="pen"
        class="icon"
      />
    </b-list-item>
  </div>
</template>

<script>
import 'vue-awesome/icons/pen';
import { mapActions, mapState } from 'vuex';
import { getHours, getMinutes } from '../../utils/formatTime';

export default {
  name: 'TimeOfDayHeadline',
  props: {
    startTimeMs: {
      type: Number,
      required: true,
    },
    allowEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputHour: this.padNumber(getHours(this.startTimeMs)),
      inputMinute: this.padNumber(getMinutes(this.startTimeMs)),
    };
  },
  computed: {
    hours() {
      return this.padNumber(getHours(this.startTimeMs));
    },
    minutes() {
      return this.padNumber(getMinutes(this.startTimeMs));
    },
    ...mapState('editor', {
      timeOfDayStartHour: state => state.displayOptions.timeOfDayStartHour,
      timeOfDayStartMinute: state => state.displayOptions.timeOfDayStartMinute,
    }),
  },
  methods: {
    padNumber(number) {
      return number.toString().padStart(2, '0');
    },
    ...mapActions('editor', [
      'setTimeOfDayStart',
    ]),
    updateHour(e) {
      this.inputHour = e.target.value;
      this.setTimeOfDayStart({ hour: this.inputHour, minute: this.timeOfDayStartMinute });
    },
    updateMinute(e) {
      this.inputMinute = e.target.value;
      this.setTimeOfDayStart({ hour: this.timeOfDayStartHour, minute: this.inputMinute });
    },
  },

};
</script>

<style lang="scss" scoped>
  .time-of-day-headline {
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
    color: #cccccc;
    font-size: 22px;
    margin-left: 5px;
    margin-bottom: 1px;
  }

  .input {
    width: 36px;
    padding: 0;
    background-color: var(--color-background-grey);
    border: none;
    outline: none;
  }
</style>
