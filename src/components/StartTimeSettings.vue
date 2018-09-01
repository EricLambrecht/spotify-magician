<template>
  <div class="display-settings">
    <b-labeled-element label="Starting time">
      <div v-if="showStartingTime" class="inputs">
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
        <b-text class="switch" @click.native="deactivateSetting">
          Hide
        </b-text>
      </div>
      <div v-else>
        <b-text class="switch" @click.native="activateSetting">
          Show
        </b-text>
      </div>
    </b-labeled-element>
  </div>
</template>
<script>
import { mapState } from 'vuex';

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
      showStartingTime: state => state.showStartingTime,
    }),
  },
  methods: {
    onChangeTime() {
      this.$store.dispatch('editor/setStartingTime', { startHour: this.startHour, startMinute: this.startMinute });
    },
    activateSetting() {
      this.$store.dispatch('editor/showStartingTime', true);
    },
    deactivateSetting() {
      this.$store.dispatch('editor/showStartingTime', false);
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
