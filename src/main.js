import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import PortalVue from 'portal-vue'

import App from './App';
import store from './store';

// Register base components globally
import './components/_base/_setup';

Vue.use(PortalVue);
Vue.component('v-icon', Icon);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
