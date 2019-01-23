<template>
  <p v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </p>
</template>
<script>
export default {
  name: 'ErrorMessage',
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
  },
};
</script>
<style lang="scss" scoped>
  .error-message {
    display: block;
    font-weight: bold;
    color: var(--color-danger);
    border: 2px solid var(--color-danger);
    border-radius: 2px;
    padding: 5px 10px;
    max-width: var(--grid-max-width);
    margin: 20px auto;
  }
</style>
