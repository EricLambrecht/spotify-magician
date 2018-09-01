<template>
  <div id="app">
    <logged-out-window v-if="!hasAccess"/>
    <main-window v-else/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import LoggedOutWindow from './components/LoggedOutWindow.vue';
import MainWindow from './components/MainWindow.vue';

export default {
  name: 'App',
  components: {
    LoggedOutWindow,
    MainWindow,
  },
  computed: {
    ...mapGetters({
      hasAccess: 'user/hasAccess',
    }),
  },
  mounted() {
    this.$store.dispatch('user/checkAccess');
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
