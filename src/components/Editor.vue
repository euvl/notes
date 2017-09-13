<template>
  <div class="editor">
    <toolbar />
    <div class="editor-container">
      <editor-title />
      <div class="content">
        <editor-text @ready="ready"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Toolbar                  from './Toolbar'
import EditorText               from './EditorText'
import EditorTitle              from './EditorTitle'

export default {
  name: 'Editor',
  components: {
    Toolbar,
    EditorText,
    EditorTitle
  },
  methods: {
    ready () {
      if (this.notes.length > 0) {
        this.$store.commit('SET_SELECTED_NOTE', this.notes[0].id)
      }
    }
  },
  computed: {
    ...mapState(['notes', 'selectedNoteId', 'notes']),
    ...mapGetters(['selected'])
  },
  mounted () {
    window.addEventListener('blur', () => {
      document.title = this.selected.title
    })

    window.addEventListener('focus', () => {
      document.title = 'Notes'
    })
  }
}
</script>
<style lang="scss">
  .editor {
    box-sizing: border-box;
    padding: 10px;
    height: 100vh;

    .title {
      background-color: transparent;
      box-sizing: border-box;
      width: 100%;
      font-weight: 600;
      font-family: 'Cardo', serif;
      font-size: 16px;
      border: 0;
      outline: none;

      padding: 0;
      padding-bottom: 10px;
      padding-left: 19px;
    }

    .content {
      height: 100%;
      outline: none;
      padding: 0 15px;
    }

    .editor-container {
      padding: 0;
      padding-top: 10px;
    }
  }
</style>
