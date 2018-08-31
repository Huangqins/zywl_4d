import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import './plugins/element.js'
import Api from './api/index'
import '@/icons' // icon
// import '@/styles/index.scss'

Vue.prototype.$api = Api;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
