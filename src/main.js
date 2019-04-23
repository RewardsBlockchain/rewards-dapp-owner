// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './globals';
import Vue from 'vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Notifications from 'vue-notification';
import Datetime from 'vue-datetime'

// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

// load contract addresses

Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(Datetime);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created: function () {
    window.Vue = this;
    window.VueGlobal = Vue;
  },
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
