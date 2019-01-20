<template>
  <div class="grid">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Grid',
};
</script>

<style lang="scss" scoped>
  .grid {
    max-width: var(--grid-max-width);
    width: 100%;
    padding: 0 var(--grid-padding);
    margin: 0 auto;
  }
</style>
