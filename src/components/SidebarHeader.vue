<template>
  <div class="sidebar-header">
    <div class="sidebar-header-content">
      <icon name="ion-ios-search"/>
      <icon name="ion-ios-paper-outline" disabled/>

      <template v-if="isMobile">
        <icon name="ion-ios-compose-outline"
           style="float:right;"
           @click="createEmptyNote"/>
      </template>
      <template v-else>
        <input class="sh-input" type="text" placeholder="Search" @input="inputSearch">
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import windowSize   from '../mixins/windowSize'
import Icon         from './Icon'

export default {
  name: 'SidebarHeader',
  mixins: [
    windowSize
  ],
  components: {
    Icon
  },
  computed: {
    ...mapState([
      'sidebarSearch',
      'sidebarSorting'
    ])
  },
  methods: {
    createEmptyNote () {
      this.$store.commit('NOTE_CREATE')
    },
    inputSearch (event) {
      this.$store.commit('SET_SIDEBAR_SEARCH', event.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .sidebar-header {
    display: block;
    position: relative;
    overflow: hidden;
    width: 210px;
    height: 48px;
    box-sizing: border-box;

    .sidebar-header-content {
      padding: 10px;
    }

    .sh-input {
      display: inline-block;
      vertical-align: top;
      font-family: inherit;
      border: 0;
      margin: 0;
      width: 106px;
      padding: 6px;
      color: #444;
      outline: none;
    }
  }
</style>
