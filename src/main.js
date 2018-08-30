import Vue from 'vue';
import App from './App.vue';

// Register base components globally
import './components/base/_setup';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
