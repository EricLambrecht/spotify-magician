import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import editor from './editor';
import user from './user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    editor,
    user,
  },
  strict: debug,
  plugins: [],
});
