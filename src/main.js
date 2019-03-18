import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import 'popper.js'
import 'bootstrap'
import '@coreui/coreui'

import 'simple-line-icons/css/simple-line-icons.css'
import '@coreui/coreui/dist/css/coreui.min.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
