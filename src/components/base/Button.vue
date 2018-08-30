<template>
  <button
    v-bind="$attrs"
    :class="{ primary: primary }"
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
  },
};
</script>

<style lang="scss" scoped>
  button {
    padding: 6px 10px 7px;
    border-radius: 3px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);

    display: inline-block;
    margin: 0 5px;

    cursor: pointer;

    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.04));
    background-color: white;
    border: 1px solid #BBB;
    color: var(--color-default);

    &:hover {
      background-image: linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.04));
    }

    &.primary {
      background-color: var(--spotify-green);
      border: none;
      color: white;
    }
  }
</style>
