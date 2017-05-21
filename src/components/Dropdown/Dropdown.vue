<template>
<div class="v--dropdown">
  <slot />
</div>
</template>

<script>
export default {
  name: 'VueJsDropdown',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {

  }
}
</script>
<style>
.v--dropdown {
  position: absolute;
}
</style>
