<template>
  <a v-bind="$attrs">
    <slot/>
  </a>
</template>

<script>
  export default {
    name: 'Link',
  };
</script>

<style lang="scss" scoped>
  a {
    color: var(--spotify-green);
  }
</style>
