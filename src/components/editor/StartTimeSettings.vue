<template>
  <div class="display-settings">
    <div v-if="showSettings" class="inputs">
      <b-number-input
        v-model="startHour"
        type="number"
        min="0"
        max="24"
        @input="onChangeTime"
      />
      <b-number-input
        v-model="startMinute"
        type="number"
        min="0"
        max="59"
        step="5"
        @input="onChangeTime"
      />
      <b-text class="switch" @click.native="showStartingTime(false)">
        Hide time of day
      </b-text>
    </div>
    <div v-else>
      <b-text class="switch" @click.native="showStartingTime(true)">
        Show time of day
      </b-text>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'StartTimeSettings',
  data() {
    return {
      startHour: 18,
      startMinute: 0,
    };
  },
  computed: {
    ...mapState('editor', {
      showSettings: state => state.displayOptions.showStartingTime,
    }),
  },
  methods: {
    ...mapActions('editor', [
      'setStartingTime',
      'showStartingTime',
    ]),
    onChangeTime() {
      this.setStartingTime({ startHour: this.startHour, startMinute: this.startMinute });
    },
  },
};
</script>
<style lang="scss" scoped>
  .display-settings {
    text-align: left;

    input {
      max-width: 50px;
    }

    .inputs {
      display: flex;
      flex-direction: row;
    }

    .switch {
      text-decoration: underline;
      font-size: 12px;
      color: var(--spotify-green);
      cursor: pointer;

      &:not(:first-child) {
        margin-left: 10px;
        align-self: center;
      }
    }
  }
</style>
