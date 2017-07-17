<template>
  <modal name="editor-settings"
         :width="220"
         :height="300">
   <div style="padding: 10px;">
     <div class="button-container">
       <button v-for="(size, i) in sizes"
               :key="i"
               :class="['size-button', {'selected': size === config.fontSize}]"
               :style="{'font-size': size + 'px'}"
               @click="config.fontSize = size">Aa</button>
      </div>
      <div class="button-container">
        <div class="color-button default"></div>
        <div class="color-button sleep"></div>
        <div class="color-button night"></div>
      </div>
      <div class="button-container">
        <button v-for="(font, i) in fonts"
                :key="i"
                :class="['font-button', {'selected': font === config.fontFamily}]"
                :style="{'font-family': font}"
                @click="config.fontFamily = font">{{font}}</button>
      </div>
    </div>
  </modal>
</template>

<script>
// <button class="font-button fb-1 selected">Serif</button>
// <button class="font-button fb-2">Sans-Serif</button>
import { mapState } from 'vuex'

export default {
  name: 'EditorSettings',
  data () {
    return {
      sizes: [13, 16, 19],
      fonts: ['Cardo', 'Open Sans']
    }
  },
  computed: {
    ...mapState([
      'config'
    ])
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

button {
  box-sizing: border-box;
  vertical-align: top;
  line-height: 42px;
  outline: none;


  background: white;
  border: 1px solid white;
  border: 0;
  color: #2C3E50;
  border-radius: 3px;

  margin: 0;
  padding: 0;

  &.selected {
    background: #F6F6F6;
    border: 1px solid #EEEEEE;
  }
}

.size-button {
  flex: 0 0 33.3333%;
}

.font-button {
  flex: 0 0 50%;

  font-size: 16px;

  &.fb-1 {
    font-family: Cardo, Georgia, serif;
  }

  &.fb-2 {
    font-family: Open Sans, Helvetica, Arial, sans-serif;
  }
}

.color-button {
  position:relative;
  box-sizing: border-box;
  margin: 0 4px;
  height: 32px;
  width: 32px;
  border-radius: 32px;

  &.default {
    border: 1px solid #919AA3;
    background: #FFFFFF;
  }

  &.sleep {
    border: 1px solid #908F8D;
    background: #F8F1E5;
  }

  &.night {
    border: 1px solid #6B6B6E;
    background: mix(#6B6B6E, white, 70%);
  }
}
</style>
