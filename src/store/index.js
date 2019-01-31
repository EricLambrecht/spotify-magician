/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import app from './app';
import editor from './editor';
import user from './user';
import playlistStatistics from './playlist-statistics';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    app,
    editor,
    user,
    playlistStatistics,
  },
  strict: debug,
  plugins: [],
});
