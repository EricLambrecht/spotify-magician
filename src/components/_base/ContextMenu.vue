<template>
  <div :class="{ 'context-menu': true, show }">
    <p
      v-for="action in actions"
      :key="action.label"
      class="action"
      @click.self="onClick($event, action)"
    >
      {{ action.label }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onClick(event, action) {
      event.preventDefault()
      action.callback()
    },
  },
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  top: 100%;
  right: 50px;
  z-index: 10;

  margin-top: 10px;
  background-color: white;
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  min-width: 100px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  display: none;

  &.show {
    display: block;
  }

  .action {
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-light-grey);
    }
  }
}
</style>
