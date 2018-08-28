<template>
  <img
    :src="imageSource"
    class="image"
    width="140">
</template>

<script>
export default {
  name: 'SquareImage',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  computed: {
    imageSource() {
      return this.url || './src/assets/logo.png';
    },
  },
};
</script>

<style lang="scss">
  .image {
    height: 140px;
    width: 140px;
    object-fit: cover;
    border-radius: 5px;
  }
</style>
