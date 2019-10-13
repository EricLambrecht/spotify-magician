<template>
  <b-labeled-element :label="label">
    <select
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-on="listeners"
    >
      <slot />
    </select>
  </b-labeled-element>
</template>

<script>
export default {
  name: 'Dropdown',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },
  },
}
</script>

<style lang="scss" scoped>
select {
  font-family: var(--font-family);
  font-size: 13px;
  color: var(--color-default-light);
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 6px 10px 6px;
  height: 34px; /* macOS needs this */
}
</style>
