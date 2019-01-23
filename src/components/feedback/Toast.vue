<template>
  <div :class="{ toast: true, [type]: true }">
    <p class="caption">
      {{ caption || displayableType }}
    </p>
    <p class="message">
      {{ message }}
    </p>
    <a 
      v-if="dismissible" 
      class="close" 
      @click="removeToast(id)"
    >
      ×
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: null,
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    displayableType() {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1);
    },
  },
  methods: {
    ...mapActions('app', [
      'removeToast',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .toast {
    position: relative;
    width: 250px;
    height: 100px;
    padding: 10px;
    font-size: 14px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 5px 12px 2px rgba(0,0,0,0.25);
    pointer-events: all;
    color: white;

    &.error {
      background-color: var(--color-danger);
    }
    &.success {
      background-color: var(--spotify-green);
    }
    &.info {
      background-color: var(--color-info);
    }
    &.warning {
      background-color: var(--color-warning);
      color: var(--color-default);
    }

    .caption {
      font-weight: bold;
    }

    .message {
      margin-top: 10px;
    }

    .close {
      font-weight: bold;
      font-size: 16px;
      text-decoration: none;
      cursor: pointer;
      position: absolute;
      top: 5px;
      right: 5px;
      padding: 5px;
    }
  }
</style>
