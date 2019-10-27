<template>
  <span :class="{ bold, italic, underline }">
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
    underline: {
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

  &.underline {
    text-decoration: underline;
  }
}
</style>
