import Vue from 'vue';
import App from './App.vue';
import store from './store';

// Register base components globally
import './components/base/_setup';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
