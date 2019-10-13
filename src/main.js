import Vue from 'vue';
import VueRouter from 'vue-router';
import Icon from 'vue-awesome/components/Icon';
import PortalVue from 'portal-vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import App from './App';
import store from './store';
import AppInitializer from './components/init/AppInitializer';
import LoggedOutWindow from './components/init/LoginScreen';
import MainWindow from './components/core/MainWindow';

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
Vue.use(VueRouter);
Vue.component('v-icon', Icon);


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainWindow,
      beforeEnter(to, from, next) {
        if (!store.getters['user/hasAccess']) {
          next('/init');
        } else {
          next();
        }
      }, 
    },
    { path: '/login', component: LoggedOutWindow, name: 'login' },
    { path: '/init', component: AppInitializer, name: 'init' },
    {
      path: '/logout',
      name: 'logout',
      // beforeEnter(to, from, next) {
      // console.warn('logging out is not supported yet');
      // next('/');
      // },
    },
  ],
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
