<template>
  <option :value="value">
    <slot />
  </option>
</template>

<script>
export default {
  name: 'DropdownItem',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
option {
  color: var(--color-default-light);
  max-width: 100%;
}
</style>
