import Vue    from 'vue'
import Modal  from 'vue-js-modal'
import App    from './App'
import store  from './store'
import router from './router'
import './filters'
import 'font-awesome/scss/font-awesome.scss'

import VueJsDropdown from './components/Dropdown/index'

Vue.use(Modal)
Vue.use(VueJsDropdown)

Vue.config.devtools = true
Vue.config.performance = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
