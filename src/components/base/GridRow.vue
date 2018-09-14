<template>
  <div class="grid-row">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'GridRow',
};
</script>

<style lang="scss" scoped>
  .grid-row {
    display: flex;
  }
</style>
