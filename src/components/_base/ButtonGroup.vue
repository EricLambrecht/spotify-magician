<template>
  <div class="button-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
}
</script>

<style lang="scss" scoped>
.button-group {
  > * {
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
