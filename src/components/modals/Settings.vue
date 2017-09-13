<template>
  <modal name="settings" :adaptive="true" :pivot-y="0.33">
    <div style="padding: 10px">
      {{config}}
      <div class="s-row">
        <div>
          Use generators:
        </div>
        <div>
          <input type="checkbox" v-model="config.useGenerators">
        </div>
      </div>

      <div class="s-row">
        <div>
          Font size:
        </div>
        <div class="button-font-select">
          <button style="font-size: 13px;" @click="setConfig('fontSize', 0)">A</button>
          <button style="font-size: 16px;" @click="setConfig('fontSize', 1)">A</button>
          <button style="font-size: 20px; "@click="setConfig('fontSize', 2)">A</button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  data () {
    return {
    }
  },
  methods: {
    setConfig (name, value) {
      // let config = { ...this.config, [name]: value }
      this.config[name] = value
    }
  },
  computed: {
    ...mapState(['config'])
  }
}
</script>
<style lang="scss">
  .s-row {
    display: flex;
    flex-direction: row;

    & > div:first-child {
      flex: 1 0 auto;
    }

    & > div:not(:first-child) {
      flex: 0 1 auto;
    }
  }

  .button-font-select {
    button {
      padding: 0;
      background: white;
      line-height: 22px;
      vertical-align: top;
      width: 32px;
      border: 1px solid #aaa;
      border-radius: 3px;
    }
  }
</style>
