<template>
  <i :class="['icon', name, disabled && 'disabled']"
     @click="$emit('click', $event)"></i>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String
    },
    disabled: {
      type: Boolean
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
