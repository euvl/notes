<template>
  <transition name="slide-fade" mode="out-in">
    <div v-if="params.isVisible"
         class="text-editor-toolbar"
         @mousedown.stop.prevent
         :style="style">
      <div class="tet-btn" @click="$emit('bold', $event)">
        <icon name="fa-bold"/>
      </div>
      <div class="tet-btn" @click="$emit('underline', $event)">
        <icon name="fa-underline"/>
      </div>
      <div class="tet-btn" @click="$emit('color', '#FFDD67', $event)">
        <icon name="fa-square" color="#FFDD67"/>
      </div>
      <div class="tet-btn" @click="$emit('clean')">
        <icon name="fa-remove"/>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'TextEditorToolbar',
  props: ['params'],
  computed: {
    style () {
      if (this.params) {
        return {
          left: (this.params.position.left - 60) + 'px',
          top: (this.params.position.top - 50) + 'px'
        }
      }
    }
  }
}
</script>
<style lang="scss">

$button-count: 4;

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px) scale(0.8);
  opacity: 0;
}

.text-editor-toolbar {
  display: block;
  position: absolute;
  transition: all 0.3s;
  z-index: 100;

  border: 1px solid #eee;
  border-top: 1px solid #f3f3f3;

  width: #{$button-count * 40 + $button-count}px;
  height: 40px;
  background: red;
  border-radius: 3px;
  color: #333;
  background-color: white;
  box-shadow: 0 5px 10px 2px rgba(0, 0, 0, .05);
  font-size: 0;

  .tet-btn {
    display: inline-block;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;

    cursor: pointer;
    font-size: 12px;

    &:not(:last-child) {
      border-right: 1px solid #eee;
    }

    &:hover {
      background: #fdfdfd;
    }
  }
}

</style>
