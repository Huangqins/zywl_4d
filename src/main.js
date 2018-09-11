import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import Api from './api/index'
import '@/icons' // icon
import '@/styles/index.scss'
import './permission'
import { authJudge } from '@/utils'

Vue.prototype.$api = Api;
Vue.prototype.$auth = authJudge;
Vue.config.productionTip = false
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
