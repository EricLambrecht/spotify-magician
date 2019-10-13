<template>
  <p>
    <slot />
  </p>
</template>

<script>
export default {
  name: 'Paragraph',
}
</script>

<style lang="scss" scoped>
p {
  font-family: inherit;
  text-align: left;
  margin: 0 0 8px;
}
</style>
