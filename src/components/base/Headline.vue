<script>
export default {
  name: 'Headline',
  props: {
    level: {
      type: String,
      default: '0',
    },
  },
  render(createElement) {
    return createElement(
      this.level === '0' ? 'span' : `h${this.level}`,
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
    font-size: 34px;
    margin: 17px 0 34px;
  }
  h2.headline {
    font-size: 26px;
    margin: 13px 0 26px;
  }
  h3.headline {
    font-size: 20px;
    margin: 10px 0 20px;
  }
  h4.headline {
    font-size: 16px;
    margin: 8px 0 16px;
  }
</style>
