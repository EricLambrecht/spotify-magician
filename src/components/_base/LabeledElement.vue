<template>
  <label v-if="label">
    {{ label }}
    <slot />
  </label>
  <div v-else class="labeled-element-fallback-container">
    <slot />
  </div>
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
.labeled-element-fallback-container {
  display: inline-block;
}
</style>
