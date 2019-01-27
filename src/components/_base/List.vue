<script>
export default {
  name: 'List',
  props: {
    ordered: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement) {
    const tag = this.ordered ? 'ol' : 'ul';
    return createElement(
      tag,
      this.$slots.default,
    );
  },
};
</script>

<style lang="scss" scoped>
  ol, ul {
    text-align: left;
    font-family: inherit;
  }
  ol {}
  ul {}
</style>
