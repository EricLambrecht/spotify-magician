<template>
  <div class="grid">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Grid',
}
</script>

<style lang="scss" scoped>
.grid {
  max-width: var(--grid-max-width);
  width: calc(100% - (2 * var(--grid-padding)));
  padding: 0 var(--grid-padding);
  margin: 0 auto;
}
</style>
