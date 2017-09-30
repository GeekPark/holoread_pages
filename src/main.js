// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './stores'
import router from './routers.js'
import Header from '@/components/Header.vue'
Vue.config.productionTip = false
Vue.component('vheader', Header)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
