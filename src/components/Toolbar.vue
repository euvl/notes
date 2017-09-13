<template>
  <div class="editor-toolbar">
    <div>
      <icon :name="menu"
            @click="toggleSidebar"/>
      <template v-if="!isMobile">
        <icon name="ion-ios-compose-outline"
              @click="createEmptyNote"/>
      </template>
      <icon name="ion-ios-bookmarks-outline"
            v-popover:foo />

      <popover name="foo">
        <div style="font-size: 14px;">
          <div>Font:</div>
          <div>Size:</div>
          <div>Mode:</div>
        </div>
      </popover>
    </div>
    <div>
      <span style="font-size: 12px; font-family: 'Cardo', serif;">
        10 words
      </span>
    </div>
    <div>
      <icon :name="star"
            @click="toggleStar"/>
      <icon name="icon ion-ios-download-outline"
            @click="downloadTxt"/>

      <icon name="icon ion-ios-gear-outline"
            disabled/>
      <!--
      <icon name="icon ion-ios-cloudy-night-outline"/>
      -->
      <icon name="icon ion-ios-trash-outline"
            @click="removeNote"/>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { download }   from '../util'
import windowSize     from '../mixins/windowSize'
import Icon           from './Icon'

export default {
  name: 'Toolbar',
  mixins: [
    windowSize
  ],
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['selected']),
    ...mapState(['sidebarVisible']),

    star () {
      return this.selected && this.selected.isStarred
        ? 'ion-ios-star'
        : 'ion-ios-star-outline'
    },

    menu () {
      return !this.sidebarVisible
        ? 'ion-ios-keypad'
        : 'ion-ios-keypad-outline'
    }
  },
  methods: {
    downloadTxt () {
      download(this.selected.title + '.txt', this.selected.text)
    },

    toggleStar () {
      this.$store.commit('NOTE_TOGGLE_STAR', this.selected.id)
    },

    toggleSidebar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },

    createEmptyNote () {
      this.$store.commit('NOTE_CREATE')
    },

    removeNote () {
      this.$store.commit('NOTE_REMOVE')
    }
  }
}
</script>
<style lang="scss">
  .icon {
    user-select: none;
  }

  .icon.ion-ios-star {
    color: #FFDD67;
  }

  .editor-toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;
    font-size: 20px;
    padding-bottom: 10px;

    & > div {
      flex: 0 0 30%;
      text-align: center;

      &:nth-child(1) {
        text-align: left;
      }

      &:nth-child(2) {
        text-align: center;
      }

      &:nth-child(3) {
        text-align: right;
      }
    }
  }
</style>
