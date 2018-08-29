<template>
  <input
    :type="type"
    v-bind="attrs"
    @input="$emit('input', $event.target.value)"
    v-on="listeners"
  >
</template>

<script>
export default {
  name: 'NumberInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      required: true,
      validator: value => value === 'number',
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
    padding: 3px 5px;
  }
</style>
