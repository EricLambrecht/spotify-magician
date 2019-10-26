<template>
  <b-labeled-element :label="label">
    <div class="container">
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        v-bind="attrs"
        :class="{ hasIcon, big }"
        @input="$emit('input', $event.target.value)"
        v-on="listeners"
      />
      <div v-if="hasIcon" :class="{ 'icon-container': true, big }">
        <slot name="icon" class="icon" />
      </div>
    </div>
  </b-labeled-element>
</template>

<script>
export default {
  name: 'TextInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      default: 'text',
      validator: value => ['text', 'password'].indexOf(value) !== -1,
    },
    placeholder: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    attrs() {
      const { type, ...attrs } = this.$attrs
      return attrs
    },
    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    },
    hasIcon() {
      return Boolean(this.$slots.icon)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  position: relative;
  cursor: text;
}

input {
  width: 100%;
  font-family: var(--font-family);
  color: var(--color-default-light);
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 6px 10px 6px;
  box-sizing: border-box;
  cursor: text;

  &.hasIcon {
    padding-right: 30px;
  }

  &.big {
    padding: 10px 16px 10px;
    font-size: var(--font-size-big-input);

    &.hasIcon {
      padding-right: 50px;
    }
  }
}

.icon-container {
  position: absolute;
  right: 10px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  color: var(--color-default-light);

  &.big {
    right: 20px;
  }

  .icon {
    height: 50%;
  }
}
</style>
