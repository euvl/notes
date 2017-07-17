<template>
  <div id="app">
    <settings/>
    <editor-settings/>
    <router-view/>
  </div>
</template>

<script>
import Settings from './modals/Settings'
import EditorSettings from './modals/EditorSettings'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Settings,
    EditorSettings
  },
  created () {
    this.$store.commit('INITIALIZE')

    const stop = (event) => {
      event.preventDefault()
      event.stopPropagation()
    }

    document.addEventListener('keydown', (event) => {
      if (event.altKey && this.selectedIndex !== -1) {
        if (event.code === 'ArrowDown') {
          let nextIndex = this.selectedIndex + 1

          if (nextIndex < this.notes.length) {
            this.$store
            .commit('SET_SELECTED_NOTE', this.notes[nextIndex].id)
          }

          stop(event)
          return
        }

        if (event.code === 'ArrowUp') {
          let nextIndex = this.selectedIndex - 1

          if (nextIndex >= 0) {
            this.$store
              .commit('SET_SELECTED_NOTE', this.notes[nextIndex].id)
          }

          stop(event)
          return
        }
      }
    })
  },
  computed: {
    ...mapGetters([
      'selectedIndex'
    ]),
    ...mapState([
      'notes',
      'selectedNoteId'
    ])
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.icon {
  font-size: 20px;

  &::before {
    cursor: pointer;
    min-width: 30px;
    text-align: center;
  }
}
</style>
