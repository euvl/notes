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
<style lang="scss">
  .icon {
    font-size: 20px;

    *.disabled {
      pointer-events: none;
      opacity: 0.2;
    }

    &::before {
      cursor: pointer;
      min-width: 30px;
      text-align: center;
    }
  }
</style>
