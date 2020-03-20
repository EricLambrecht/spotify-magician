<template>
  <div class="light-switch-input">
    <span v-show="label" class="label">
      {{ label }}
    </span>
    <div :class="{ switch: true, on, 'white-background': whiteBackground }">
      <div :class="{ 'switch-handle': true, on }" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightSwitchVue',
  props: {
    label: {
      type: String,
      default: '',
    },
    on: {
      type: Boolean,
      required: true,
    },
    whiteBackground: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.light-switch-input {
  display: inline-flex;
  align-items: center;

  height: var(--input-height-default);

  font-size: var(--font-size-default);

  cursor: pointer;
}

.label {
  position: relative;
  top: -1px;
  margin-right: 8px;
}

.switch {
  width: 36px;
  height: 17px;
  border-radius: 5px;

  background-color: #d2d2d2;
  display: inline-flex;

  padding: 3px;
  box-sizing: border-box;
}

.switch-handle {
  width: 15px;
  height: 11px;
  border-radius: 3px;

  background-color: var(--color-grey);

  position: relative;
  left: 0;
  transition: left 0.2s ease-out;

  &.on {
    background-color: var(--spotify-green);
    left: 15px;
  }
}
</style>
