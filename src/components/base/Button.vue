<template>
  <button
    v-bind="$attrs"
    :class="{ primary: primary, tertiary: tertiary }"
    v-on="$listeners"
  >
    <slot/>
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
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);

    cursor: pointer;

    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.04));
    background-color: white;
    color: var(--color-default);
    font-size: 14px;

    &:hover {
      background-image: linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.04));
    }

    &.primary {
      background-color: var(--spotify-green);
      box-shadow: 0 2px 1px 0 rgba(11, 74, 34, 0.3);
      border: none;
      color: white;
    }

    &.tertiary {
      background-image: none;
      background-color: transparent;
      box-shadow: none;
      &:hover {
        background-image: none;
        background-color: #E9E9E9;
      }
    }
  }
</style>
