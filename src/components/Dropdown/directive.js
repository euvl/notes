export default {
  bind (el, binding, vnode) {
    let { modifiers, value } = binding
    let eventName = modifiers.hover ? 'mouseenter' : 'click'

    console.log(vnode)

    const handler = (event) => {
      console.log(event, value)
    }

    el.addEventListener(eventName, handler)
  }
}
