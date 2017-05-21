<template>
  <transition name="slide-fade" mode="out-in">
    <div v-if="params.isVisible"
         class="text-editor-toolbar"
         @mousedown.stop.prevent
         :style="style">
      <div class="tet-btn" @click="$emit('bold', $event)">
        <i class="fa fa-fw fa-bold"></i>
      </div>
      <div class="tet-btn" @click="$emit('underline', $event)">
        <i class="fa fa-fw fa-underline"></i>
      </div>
      <div class="tet-btn" @click="$emit('color', '#FFDD67', $event)">
        <i class="fa fa-fw fa-square" style="color: #FFDD67;"></i>
      </div>
      <div class="tet-btn" @click="$emit('clean')">
        <i class="fa fa-fw fa-remove"></i>
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

.slide-fade-enter-active {
//  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
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
    //box-sizing: border-box;
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;

    color: #333;
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
