<template>
  <button
    v-bind="$attrs"
    :class="{ primary: primary, tertiary: tertiary }"
    v-on="$listeners"
  >
    <slot />
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
    tertiary: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  button {
    display: inline-block;
    margin: 0 5px;
    padding: 6px 10px 7px;

    border-radius: 3px;
    border: none;
    outline: 0;

    cursor: pointer;

    background-color: white;

    font-family: var(--font-family);
    color: var(--color-default);
    font-size: 14px;

    &:hover {
      background-image: linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.04));
    }

    &.primary {
      background-color: var(--spotify-green);
      border: none;
      color: white;
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
  }
</style>
