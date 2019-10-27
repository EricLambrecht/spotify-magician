<template>
  <div
    v-if="skeleton"
    class="skeleton"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
  <img v-else :src="url" :style="style" :width="size" class="image" />
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
    skeleton: {
      type: Boolean,
      default: false,
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

<style lang="scss" scoped>
$color-bg: #ddd;
$color-highlight: lighten($color-bg, 3%);

.skeleton {
  border-radius: 5px;
  background: $color-bg;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, $color-bg, $color-highlight, $color-bg);
    animation: shine 0.8s ease-out infinite;
  }
}

@keyframes shine {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
