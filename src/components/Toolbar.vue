<template>
  <div class="editor-toolbar">
    <div class="et-left">
      <icon name="ion-ios-keypad-outline" @click="toggleSidebar"/>
      <template v-if="!isMobile">
        <icon name="ion-ios-compose-outline" @click="createEmptyNote"/>
      </template>
      <icon name="ion-ios-bookmarks-outline"/>
    </div>
    <div class="et-right">
      <icon :name="star" @click="toggleStar"/>
      <icon name="icon ion-ios-download-outline" @click="downloadTxt"/>
      <icon name="icon ion-ios-gear-outline" @click="showSettings"/>
      <icon name="icon ion-ios-trash-outline" @click="removeNote"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
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
    star () {
      return 'ion-ios-star' +
        (this.selected && this.selected.isStarred ? '' : '-outline')
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

    showSettings () {
      this.$modal.show('settings')
    },

    removeNote () {
      this.$store.commit('NOTE_REMOVE')
    }
  }
}
</script>
<style>
  @keyframes example {
    from {
      background-color: red;
    }
    to {
      background-color: yellow;
    }
  }

  .icon {
    user-select: none;
  }

  .icon.ion-ios-star {
    color: #FFDD67;
  }
</style>
