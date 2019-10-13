<template>
  <span :class="{ bold: bold, italic: italic }">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'Text',
  props: {
    bold: {
      type: Boolean,
      default: false,
    },
    italic: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
span {
  font-family: inherit;
  display: inline;

  &.bold {
    font-weight: bold;
  }

  &.italic {
    font-style: italic;
  }
}
</style>
