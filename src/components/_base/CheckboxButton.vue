<template>
  <div :class="{ button: true, checked }">
    <v-icon
      :name="checked ? 'check' : 'times'"
      label="checkbox-icon"
      class="icon"
    />
    <label class="label">
      {{ label }}
      <input
        ref="checkbox"
        type="checkbox"
        class="checkbox"
        @input="e => emitEvent(e)"
      />
    </label>
  </div>
</template>

<script>
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/times'

export default {
  name: 'CheckboxButton',
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    emitEvent(e) {
      if (e.target.checked) {
        this.$emit('turnedOn')
      } else {
        this.$emit('turnedOff')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  height: 26px;
  border-radius: 13px;
  border: 1px solid var(--spotify-green);

  background-color: transparent;
  color: var(--color-default-opposite);

  font-size: 13px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;

  transition: background-color 0.2s var(--ease-out-quart);

  &.checked {
    background-color: var(--spotify-green);
    border: 1px solid var(--spotify-green);
    color: white;
  }
}

.checkbox {
  display: none;
}

.label {
  cursor: pointer;
}

.icon {
  margin-right: 5px;
}
</style>
