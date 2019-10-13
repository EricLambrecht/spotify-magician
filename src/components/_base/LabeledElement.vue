<template>
  <label v-if="label">
    {{ label }}
    <slot />
  </label>
  <span v-else>
    <slot />
  </span>
</template>

<script>
export default {
  name: 'LabeledElement',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 13px;
  font-weight: bold;
  padding: 0;
}
label > *:first-child {
  margin-top: 8px;
}
</style>
