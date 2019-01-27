<template>
  <b-labeled-element :label="label">
    <input
      :type="type"
      :value="value"
      v-bind="attrs"
      @input="$emit('input', $event.target.value)"
      v-on="listeners"
    >
  </b-labeled-element>
</template>

<script>
export default {
  name: 'TextInput',
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
    type: {
      default: 'text',
      validator: value => ['text', 'password'].indexOf(value) !== -1,
    },
  },
  computed: {
    attrs() {
      const { type, ...attrs } = this.$attrs;
      return attrs;
    },
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    },
  },
};
</script>

<style lang="scss" scoped>
  input {
    font-family: var(--font-family);
    color: var(--color-default-light);
    border-radius: 3px;
    border: 1px solid #CCC;
    padding: 6px 10px 6px;
  }
</style>
