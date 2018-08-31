import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import editor from './editor';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    editor,
  },
  strict: debug,
  plugins: [],
});
