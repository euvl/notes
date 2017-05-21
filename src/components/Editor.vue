<template>
  <div class="editor">
    <toolbar />
    <div class="editor-container" v-if="selected">
      <input class="title"
             type="text"
             v-model="title"
             @input="inputTitle"
             @blur="unfocus"
             placeholder="Title...">
      <div class="content editable" ref="content">
        <text-editor :text="text" @change="inputText"/>
      </div>
    </div>
  </div>
</template>
<script>
import subs                     from '../modules/substitutes'
import { mapState, mapGetters } from 'vuex'
import TextEditor               from './TextEditor'
import Toolbar                  from './Toolbar'

export default {
  name: 'Editor',
  data () {
    return {
      title: '',
      text: ''
    }
  },
  components: {
    TextEditor,
    Toolbar
  },
  watch: {
    selectedNoteId: {
      handler (id) {
        this.$nextTick(() => {
          if (id) {
            this.text = this.selected.text
            this.title = this.selected.title
          } else {
            this.text = ''
            this.title = ''
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    inputText (event) {
      if (this.selected && this.selected.text !== event.value) {
        this.$store.commit('NOTE_SET_TEXT', {
          id: this.selectedNoteId,
          text: event.value
        })
      }
    },

    inputTitle () {
      if (this.selected && this.selected.title !== this.title) {
        this.$store.commit('NOTE_SET_TITLE', {
          id: this.selectedNoteId,
          title: this.title
        })
      }
    },

    unfocus (event) {
      let { title } = this

      for (var i = 0; i < subs.length; i++) {
        let sub = subs[i]

        title = title.replace(sub.regexp, sub.fn)
      }

      this.title = title
      this.$store.commit('NOTE_SET_TITLE', {
        id: this.selectedNoteId,
        title: this.title
      })
    }
  },
  computed: {
    ...mapState(['notes', 'selectedNoteId']),
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
