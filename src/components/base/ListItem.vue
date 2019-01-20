<template>
  <li v-on="$listeners">
    <slot />
  </li>
</template>

<script>
export default {
  name: 'ListItem',
};
</script>

<style lang="scss" scoped>
  li {
    padding: 10px 10px;
  }
</style>
