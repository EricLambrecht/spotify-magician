<script>
export default {
  name: 'Headline',
  props: {
    level: {
      type: String,
      default: '1',
    },
  },
  render(createElement) {
    return createElement(
      `h${this.level}`,
      {
        class: {
          headline: true,
        },
      },
      this.$slots.default,
    );
  },
};
</script>

<style lang="scss" scoped>
  h1.headline {
    font-weight: bold;
    font-size: 32px;
  }
  h2.headline {
    font-weight: bold;
    font-size: 26px;
  }
  h3.headline {
    font-weight: bold;
    font-size: 20px;
  }
  h4.headline {
    font-weight: bold;
    font-size: 16px;
  }
</style>
