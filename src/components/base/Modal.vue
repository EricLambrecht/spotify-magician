<template>
  <div class="backdrop">
    <div class="modal">
      <div v-if="headline" class="header">
        <b-headline level="3" class="headline">
          {{ headline }}
        </b-headline>
      </div>
      <div class="main">
        <slot />
      </div>
      <div v-if="$slots.footer" class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    headline: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
  .backdrop {
    z-index: 100;

    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;

    background-color: hsla(0,0,0, 0.3);

    display: grid;
    grid-template-columns: 100px 1fr 100px;

    opacity: 1;

    .modal {
      z-index: 101;
      background-color: white;
      border-radius: 5px;

      grid-column-start: 2;
      align-self: center;
      justify-self: center;

      box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.15);

      min-height: 160px;
      min-width: 250px;

      transform: scale(1.0);
      opacity: 1;

      .header {
        padding: 25px 30px 0;

        .headline {
          margin: 0 0 2px;
        }
      }

      .main {
        padding: 20px 30px;
      }

      .footer {
        padding: 20px 30px;
        background-color: var(--color-background-grey);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    }

    &.modal-enter-active, &.modal-leave-active  {
      .modal {
        transition: all .25s ease;
      }
    }
    &.modal-enter-active {
      transition: all .25s ease-out;
    }
    &.modal-leave-active {
      transition: all .2s ease-in;
    }
    &.modal-enter, &.modal-leave-to {
      opacity: 0;

      .modal {
        transform: scale(0.8) translateY(50px);
        opacity: 0;
      }
    }
  }
</style>
