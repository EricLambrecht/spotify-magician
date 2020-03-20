<template>
  <div
    v-if="skeleton"
    class="skeleton"
    :style="{
      width: size ? `${size}px` : '100%',
      height: size ? `${size}px` : '100%',
    }"
  />
  <img v-else :src="url" :style="style" class="image" />
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
      default: null,
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    style() {
      if (this.size) {
        return `{ width: ${this.size}px; height: ${this.size}px; }`
      }
      return '{ width: 100%; height: 100%; }'
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
