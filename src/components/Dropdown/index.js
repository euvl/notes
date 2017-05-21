import Dropdown from './Dropdown.vue'

const Plugin = {
  install (Vue, options = {}) {
    // if (!this.hasOwnProperty('event')) {
    //   Plugin.event = new Vue()
    // }
    /*
    const $plugin = {
      show (name, params) {
        Plugin.event.$emit('toggle', name, true, params)
      },

      hide (name, params) {
        Plugin.event.$emit('toggle', name, false, params)
      },

      toggle (name, params) {
        Plugin.event.$emit('toggle', name, undefined, params)
      }
    }
    Object.defineProperty(Vue.prototype, '$dropdown', {
      get: () => {}
    })
    */

    Vue.directive('dropdown', {
      bind (el, binding, vnode) {
        let { modifiers, value } = binding
        let eventName = modifiers.hover ? 'mouseenter' : 'click'

    //    console.log(vnode)

        const handler = (event) => {
          console.log(event, value)
        }

        if (el) {
          el.addEventListener(eventName, handler)
        }
      }
    })

    Vue.component('dropdown', Dropdown)

    return null
  }
}

export default Plugin
