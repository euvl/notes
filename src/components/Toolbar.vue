<template>
  <div class="editor-toolbar">
    <div>
      <icon :name="menu"
            @click="toggleSidebar"/>
      <icon name="ion-ios-compose-outline"
            v-if="!isMobile"
            @click="createEmptyNote"/>
      <icon name="ion-ios-bookmarks-outline"
            v-popover:foo/>

      <popover name="foo">
        <div style="font-size: 14px;">
          <div>Font:</div>
          <div>Size:</div>
          <div>Mode:</div>
        </div>
      </popover>
    </div>
    <div>
      <span class="word-count">
        10 words
      </span>
    </div>
    <div>
      <icon :name="star"
            @click="toggleStar"/>
      <icon name="icon ion-ios-download-outline"
            @click="download"/>

      <!--
      <icon name="icon ion-ios-gear-outline"
            disabled/>
      -->

      <icon name="icon ion-ios-timer-outline"
            @click="toggleNightMode"/>

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
    download () {
      download(this.selected.title + '.txt', this.selected.text)
    },

    toggleStar () {
      this.$store.commit('NOTE_TOGGLE_STAR', this.selected.id)
    },

    toggleSidebar () {
      this.$store.commit('TOGGLE_SIDEBAR')
    },

    toggleNightMode () {
      this.$store.commit('TOGGLE_NIGHT_MODE')
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

  .word-count {
    font-size: 12px;
    font-weight: 600;
    font-family: 'Cardo', serif;
    color: #b8b8b8;
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
