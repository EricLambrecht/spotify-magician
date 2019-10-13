<template>
  <div>
    <p v-if="label" class="label">
      {{ label }}
    </p>
    <div class="button-group">
      <label
        v-for="key in optionKeys"
        :key="key"
        :class="{ button: true, checked: value === key }"
      >
        {{ options[key] }}
        <input
          type="radio"
          class="input"
          :value="key"
          :name="name"
          :checked="value === key"
          @click="$emit('change', key)"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioButtonGroup',
  props: {
    options: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    optionKeys() {
      return Object.keys(this.options)
    },
  },
}
</script>

<style lang="scss" scoped>
.label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-default);
  margin-bottom: 5px;
}

.button {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px 7px;

  border: 1px solid #ccc;
  border-left-width: 0;
  outline: 0;

  cursor: pointer;

  background-color: white;

  font-family: var(--font-family);
  color: var(--color-default);
  font-size: 13px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &:first-child {
    border-left-width: 1px;
    border-radius: 3px 0 0px 3px;
  }

  &:last-child {
    border-radius: 0 3px 3px 0;
  }

  &.checked {
    background-color: var(--spotify-green);
    border-color: var(--spotify-green);
    color: white;
  }
}

.input {
  display: none;
}
</style>
