<template>
  <button
    v-bind="$attrs"
    :class="{ button: true, primary, secondary, tertiary, disabled, small }"
    :disabled="disabled"
    v-on="$listeners"
  >
    <span v-if="hasIcon" class="icon">
      <slot name="icon" />
    </span>
    <span class="label">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    tertiary: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasIcon() {
      return Boolean(this.$slots.icon);
    },
  },
};
</script>

<style lang="scss" scoped>
  button, .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 10px 7px;

    border-radius: 3px;
    border: none;
    outline: 0;

    cursor: pointer;

    background-color: white;

    font-family: var(--font-family);
    color: var(--color-default);
    font-size: 14px;

    &.small {
      font-size: 12px;
    }

    &:hover {
      background-color: rgba(0,0,0,0.04);
    }

    &.primary {
      background-color: var(--spotify-green);
      border: none;
      color: white;
    }

    &.secondary {
      background-color: white;
      border: none;
      color: var(--color-default);
    }

    &.tertiary {
      background-image: none;
      background-color: transparent;
      box-shadow: none;
      &:hover {
        background-image: none;
        background-color: #E0E0E0;
      }
    }

    &.disabled {
      cursor: not-allowed;
    }
  }

  .icon {
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
  }

  .label {}
</style>
