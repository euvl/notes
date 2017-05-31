import Vue      from 'vue'
import Modal    from 'vue-js-modal'
import Tooltip  from 'v-tooltip'
import Dropdown from './components/Dropdown/index'
import Icon     from './components/Icon'

import App      from './App'
import store    from './store'
import router   from './router'

import './filters'
import 'font-awesome/scss/font-awesome.scss'

Vue.component('Icon', Icon)

Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(Dropdown)

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
