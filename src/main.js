import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon';
import PortalVue from 'portal-vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import App from './App';
import store from './store';
import versionFile from './version.json';

// Register base components globally
import './components/_base/_setup';

const version = process.env.WEBPACK_DEV_SERVER ? `${versionFile.version}-dev` : versionFile.version;

Sentry.init({
  release: `spotify-magician@${version}`,
  dsn: 'https://d9594251266d4383bd960036f78f0d57@sentry.io/1763722',
  integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })],
});

Vue.use(PortalVue);
Vue.component('v-icon', Icon);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
