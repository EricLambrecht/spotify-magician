<template>
  <div class="fixed-container">
    <toast
      v-for="(toast, index) in toastMessages"
      :key="toast.id"
      :id="toast.id"
      :message="toast.message"
      :dismissible="toast.dismissible"
      :type="toast.type"
      :style="getCssStyleObject(index)"
      class="toast"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Toast from './Toast.vue';

export default {
  name: 'ToastMessageSystem',
  components: { Toast },
  computed: {
    ...mapGetters('app', [
      'toastMessages',
    ]),
  },
  methods: {
    getCssStyleObject(index) {
      const toastHeight = 120;
      const margin = 20;
      return {
        height: `${toastHeight}px`,
        boxSizing: 'border-box',
        transform: `translateY(${(toastHeight + margin) * index}px)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .fixed-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;

    width: 100%;
    height: 100vh;
    background-color: transparent;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    box-sizing: border-box;

    pointer-events: none;

    .toast {
      position: absolute;
      top: 20px;
      right: 40px;

      opacity: 1;
      transition: transform 0.15s ease, opacity 0.1s ease;

      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
  }
</style>
