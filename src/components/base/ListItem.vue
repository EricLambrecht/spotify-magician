<template>
  <li>
    <slot/>
  </li>
</template>

<script>
export default {
  name: 'ListItem',
};
</script>

<style lang="scss" scoped>
  li {
    margin-top: 10px;
  }
</style>
