<template>
  <li :draggable="draggable" v-on="$listeners">
    <slot />
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    draggable: {
      type: String,
      required: false,
      default: 'false',
    },
  },
}
</script>

<style lang="scss" scoped>
li {
  padding: 10px 10px;
  font-family: inherit;
}
</style>
