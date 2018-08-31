<template>
  <div class="display-settings">
    <span>Start Time:</span>
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
  </div>
</template>
<script>
export default {
  name: 'StartTimeSettings',
  data() {
    return {
      startHour: 18,
      startMinute: 0,
    };
  },
  methods: {
    onChangeTime() {
      this.$store.dispatch('editor/setStartingTime', { startHour: this.startHour, startMinute: this.startMinute });
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
  }
</style>
