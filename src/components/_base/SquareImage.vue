<template>
  <img :src="url" :style="style" :width="size" class="image" />
</template>

<script>
export default {
  name: 'SquareImage',
  props: {
    url: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 140,
    },
  },
  computed: {
    style() {
      return `{ width: ${this.size}px; height: ${this.size}px; }`
    },
  },
}
</script>

<style lang="scss">
.image {
  object-fit: cover;
  border-radius: 5px;
}
</style>
