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
  .headline {
    color: var(--color-default);
    font-weight: bold;
  }
  h1.headline {
    font-size: 32px;
  }
  h2.headline {
    font-size: 26px;
  }
  h3.headline {
    font-size: 20px;
  }
  h4.headline {
    font-size: 16px;
  }
</style>
