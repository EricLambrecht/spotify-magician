<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style lang="scss" scoped>
  .container {
    max-width: var(--grid-max-width);
    width: 100%;
    padding: 0 var(--grid-padding);
    margin: 0 auto;
  }
</style>
