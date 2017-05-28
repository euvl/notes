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
// import { transformText }        from '../modules/transform'
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
    change (event) {
      if (this.selected && this.selected.text !== event.value) {
        this.$store.commit('NOTE_SET_TEXT', {
          id: this.selectedNoteId,
          text: event.value || ''
        })
      }

      this.$store.commit('NOTE_SET_MARKS', {
        id: this.selectedNoteId,
        marks: event.marks || []
      })
    },

    ready () {
      if (this.notes.length > 0) {
        this.$store.commit('SET_SELECTED_NOTE', this.notes[0].id)
      }
    }
  },
  computed: {
    ...mapState(['notes', 'selectedNoteId', 'notes']),
    ...mapGetters(['selected'])
  }
}
</script>
<style lang="scss">
  .editor {
    box-sizing: border-box;
    padding: 10px;
    height: 100vh;

    .title {
      box-sizing: border-box;
      width: 100%;
      font-weight: 600;
      font-family: 'Cardo', serif;
      font-size: 16px;
      border: 0;
      outline: none;

      padding: 0;
      padding-bottom: 10px;
      padding-left: 34px;
    }

    .content {
      height: 100%;
      outline: none;
    }

    .editor-toolbar {
      display: flex;
      flex-direction: row;
      width: 100%;
      font-size: 20px;
      padding-bottom: 10px;

      .et-left {
        text-align: left;
        flex: 1;
      }

      .et-right {
        text-align: right;
        flex: 1;
      }
    }

    .editor-container {
      padding: 0;
      padding-top: 10px;
    }
  }
</style>
