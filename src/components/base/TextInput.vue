<template>
  <input
    :type="type"
    v-bind="attrs"
    v-on="$listeners"
  >
</template>

<script>
export default {
  name: 'TextInput',
  props: {
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
  },
};
</script>

<style lang="scss" scoped>
  input {
    padding: 5px 10px;
  }
</style>
