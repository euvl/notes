<template>
  <i :class="className"
     :style="style"
     @click="$emit('click', $event)"></i>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String
    },
    color: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  computed: {
    className () {
      return [
        'icon',
        this.name,
        {
          'disabled': this.disabled,
          'fa fa-fw': this.name.indexOf('fa-') === 0
        }
      ]
    },
    style () {
      return { color: this.color }
    }
  }
}
</script>
<style>
  .icon.disabled {
    pointer-events: none;
    opacity: 0.2;
  }
</style>
