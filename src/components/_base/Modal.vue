<template>
  <portal v-if="show" to="modals">
    <transition :duration="300" name="modal" appear>
      <div class="backdrop">
        <div class="modal" :class="{ mobileFullWidth }">
          <div v-if="headline" class="header">
            <b-headline level="3" class="headline">
              {{ headline }}
            </b-headline>
          </div>
          <div class="main" :style="modalStyles">
            <slot />
          </div>
          <div v-if="$slots.footer" class="footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    mobileFullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    headline: {
      type: String,
      default: null,
    },
    modalStyles: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
:root {
  --modal-padding-top: 25px;
  --modal-padding-side: 30px;
  --modal-padding-between: 20px;
  --modal-padding-bottom: 20px;
  --modal-headline-margin-bottom: 2px;
}

@media screen and (max-width: 768px) {
  :root {
    --modal-padding-top: 20px;
    --modal-padding-side: 20px;
    --modal-padding-between: 15px;
    --modal-padding-bottom: 15px;
    --modal-headline-margin-bottom: 0;
  }
}
</style>

<style lang="scss" scoped>
.backdrop {
  z-index: var(--z-index-modal-backdrop);

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: hsla(0, 0, 0, 0.3);

  display: grid;
  grid-template-columns: 20px 1fr 20px;

  opacity: 1;

  &.modal-enter-active,
  &.modal-leave-active {
    .modal {
      transition: all 0.25s ease;
    }
  }
  &.modal-enter-active {
    transition: all 0.25s ease-out;
  }
  &.modal-leave-active {
    transition: all 0.2s ease-in;
  }
  &.modal-enter,
  &.modal-leave-to {
    opacity: 0;

    .modal {
      transform: scale(0.8) translateY(50px);
      opacity: 0;
    }
  }
}

.modal {
  z-index: var(--z-index-modal);
  background-color: white;
  border-radius: 5px;

  grid-column-start: 2;
  align-self: center;
  justify-self: center;

  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);

  min-height: 160px;
  min-width: 250px;
  max-width: 100%;

  transform: scale(1);
  opacity: 1;

  @media screen and (max-width: 768px) {
    &.mobileFullWidth {
      width: 100%;
    }
  }
}

.header {
  padding: var(--modal-padding-top) var(--modal-padding-side) 0;

  .headline {
    margin: 0 0 var(--modal-headline-margin-bottom);
  }
}

.main {
  padding: var(--modal-padding-between) var(--modal-padding-side);
}

.footer {
  padding: var(--modal-padding-between) var(--modal-padding-side)
    var(--modal-padding-bottom);
  background-color: var(--color-background-grey);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
