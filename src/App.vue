<template>
  <div id="app" v-resize:throttle.300="onResize">
    <template v-if="$route.matched.length">
      <router-view :key="$route.fullPath" />
    </template>
    <template v-else>
      <unknown-route />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import resize from 'vue-resize-directive';

import UnknownRoute from './components/core/UnknownRoute';

export default {
  name: 'App',
  components: {
    UnknownRoute,
  },
  directives: {
    resize,
  },
  computed: {
    ...mapGetters({
      hasAccess: 'user/hasAccess',
    }),
  },
  mounted() {},
  methods: {
    onResize(app) {
      this.$store.dispatch('app/updateAppWidth', app.clientWidth);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import 'assets/css/css_reset.css';
  @import 'assets/css/globals.css';

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-default);
  }

</style>
