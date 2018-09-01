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
  @import './assets/css_reset.css';

  :root {
    --spotify-green: #1DB954;
    --spotify-black: #191414;

    --color-default: #343030;
    --color-default-light: #454242;
    --color-danger: #e25451;
  }

  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--color-default);
    max-width: 1000px;
    margin: 60px auto;
  }

</style>
