<template>
  <div class="display-settings">
    <span>Start Time:</span>
    <b-number-input
      v-model="startHour"
      type="number"
      min="0"
      max="24"
      @change="onChangeTime(startHour, startMinute)"
    />
    <b-number-input
      v-model="startMinute"
      type="number"
      min="0"
      max="59"
      step="5"
      @change="onChangeTime(startHour, startMinute)"
    />
  </div>
</template>
<script>
export default {
  name: 'StartTimeSettings',
  props: {
    onChangeTime: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      startHour: 18,
      startMinute: 0,
    };
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
