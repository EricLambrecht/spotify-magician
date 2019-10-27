<template>
  <span>
    <slot />
  </span>
</template>

<script>
export default {
  name: 'Badge',
}
</script>

<style lang="scss" scoped>
span {
  padding: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  font-size: 9px;
  font-weight: bold;
  border-radius: 8px;
  background: var(--spotify-green);
  color: white;
}
</style>
