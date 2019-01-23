<template>
  <p>
    <slot />
  </p>
</template>

<script>
export default {
  name: 'Paragraph',
};
</script>

<style lang="scss" scoped>
  p {
    text-align: left;
  }
</style>
