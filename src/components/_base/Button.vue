<template>
  <div v-if="skeleton" class="skeleton">
    <span v-if="hasIcon" class="icon">
      <slot name="icon" />
    </span>
    <slot />
  </div>
  <button
    v-else
    v-bind="$attrs"
    :class="{
      button: true,
      primary,
      secondary,
      tertiary,
      disabled,
      small,
      pressed,
    }"
    :disabled="disabled"
    v-on="$listeners"
  >
    <span v-if="hasIcon" class="icon">
      <slot name="icon" />
    </span>
    <span class="label">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    tertiary: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    pressed: {
      type: Boolean,
      default: false,
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasIcon() {
      return Boolean(this.$slots.icon)
    },
  },
}
</script>

<style lang="scss" scoped>
button,
.button,
.skeleton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--input-height-default);
  padding: 6px 12px 7px;

  border-radius: 3px;
  border: none;
  outline: 0;

  cursor: pointer;

  background-color: white;

  font-family: var(--font-family);
  color: var(--color-default);
  font-size: var(--font-size-default);

  &.small {
    font-size: 12px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &.primary {
    background-color: var(--spotify-green);
    border: none;
    color: white;
  }

  &.secondary {
    background-color: white;
    border: none;
    color: var(--color-default);
  }

  &.tertiary {
    background-image: none;
    background-color: transparent;
    box-shadow: none;
    &:hover {
      background-image: none;
      background-color: #e0e0e0;
    }
  }

  &.disabled {
    cursor: not-allowed;
  }

  &.pressed {
    background-color: rgba(0, 0, 0, 0.12);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
}

.icon {
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
}

.label {
}

$color-bg: #ddd;
$color-highlight: lighten($color-bg, 3%);

.skeleton {
  position: relative;
  border-radius: 5px;
  box-sizing: border-box;
  background: $color-bg;
  color: $color-bg;
  overflow: hidden;
  cursor: default;

  .icon {
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
    .fa-icon {
      color: $color-bg !important;
    }
  }

  &:hover {
    background: $color-bg;
  }

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
