import Vue from 'vue'
import router from './router'
import App from './App.vue'

import './common/stylus/index.styl'

const axios = require('axios')
axios.defaults.baseURL = 'http://result.eolinker.com'
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
