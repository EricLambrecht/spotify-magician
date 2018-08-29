<template>
  <label>
    {{ label }}
    <input
      :type="type"
      :value="value"
      v-bind="attrs"
      @input="$emit('input', $event.target.value)"
      v-on="listeners"
    >
  </label>
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
      required: true,
      validator: value => ['type', 'password'].indexOf(value) !== -1,
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
  label {
    padding: 0;
  }
  input {
    padding: 5px 10px;
  }
</style>
