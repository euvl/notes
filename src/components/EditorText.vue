<template>
  <div class="text-editor" @click="focusEditor">
    <text-editor-toolbar
      :params="toolbar"
      @color="addMark('marker-yellow')"
      @underline="addMark('marker-underline')"
      @bold="addMark('marker-bold')"
      @clean="clean"/>
    <div class="editable-wrapper" @click.stop>
      <textarea class="editable"
                ref="editable"
                name="text"
                placeholder="Lorem ipsum dolor sit amet..."
                style="display: none;"></textarea>
    </div>
  </div>
</template>
<script>

import TextEditorToolbar from './TextEditorToolbar'
import CodeMirror        from 'codemirror'
import { transformText } from '@/modules/transform'
import { mapGetters, mapState }    from 'vuex'
import '../../node_modules/codemirror/addon/display/placeholder.js'
import '../../node_modules/codemirror/lib/codemirror.css'

export default {
  name: 'TextEditor',
  props: {
    text: {
      type: String
    }
  },
  components: {
    TextEditorToolbar
  },
  watch: {
    selectedNoteId: {
      handler (id) {
        if (this.editor && this.selected) {
          let { text, marks } = this.selected

          this.editor.setValue(text)

          if (marks) {
            marks.forEach(mark => {
              let { from, to, className } = mark

              this.editor.markText(from, to, {
                className,
                addToHistory: false
              })
            })
          }

          this.editor.refresh()
          this.editor.clearHistory()
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      toolbar: {
        isVisible: false,
        position: {
          left: 0,
          top: 0
        }
      },
      editor: null
    }
  },
  computed: {
    ...mapGetters(['selected']),
    ...mapState(['selectedNoteId', 'config'])
  },
  mounted () {
    const editor = CodeMirror.fromTextArea(this.$refs.editable, {
      value: '',
      styleSelectedText: true,
      lineWrapping: true,
      dragDrop: false,
      gutters: ['breakpoints', 'CodeMirror-linenumbers']
    })

    const mouseup = (event) => {
      this.$nextTick(() => {
        let { from, to } = this.getSelectedRange()
        let el = document.querySelector('.CodeMirror')

        if (from.ch === to.ch && from.line === to.line) {
          this.hideToolbar()
          return
        }

        let posFrom = editor.charCoords(from)
        let posTo = editor.charCoords(to)

        let position = {
          top: posFrom.top,
          left: 0
        }
        if (from.line !== to.line) {
          let rect = el.getBoundingClientRect()
          position.left = rect.left + 0.5 * rect.width
        } else {
          position.left =
            Math.round(posFrom.left + (posTo.left - posFrom.left) / 2)
        }

        this.toolbar.isVisible = true
        this.$set(this.toolbar, 'position', position)
      })

      event.preventDefault()
      document.removeEventListener('mouseup', mouseup)
    }

    editor.on('mousedown', (event) => {
      document.addEventListener('mouseup', mouseup)
    })

    editor.on('blur', this.hideToolbar)

    editor.on('keyup', (event) => {
      if (this.config.useGenerators) {
        let { line } = editor.getCursor()
        let lineText = editor.getLine(line)

        transformText(lineText, event => {
          let { replacement, value, position } = event
          let length = value.length
          let start = { line, ch: position }
          let end = { line, ch: start.ch + length }

          editor.replaceRange(replacement, start, end)
          editor.setCursor({ line, ch: start.ch + replacement.length })
        })
      }

      this.hideToolbar()
    })

    /*
    editor.setOption('extraKeys', {
      'Ctrl-N': this.highlight,
      'Alt-B': this.bolden,
      'Alt-T': this.clean
    })
    */

    editor.on('change', (event, change) => {
      if (change.origin === 'setValue') {
        return
      }

      this.commit()
    })

    this.editor = editor
    this.$emit('ready', { editor })
  },
  methods: {
    hideToolbar (event) {
      this.toolbar.isVisible = false
    },

    focusEditor () {
      this.editor.focus()
    },

    clean () {
      const { from, to } = this.getSelectedRange()
      const marks = this.editor.findMarks(from, to)

      marks.forEach(mark => {
        let range = mark.find()
        let selected = this.getSelectedRange()

        let cf = this.comparePositions(range.from, selected.from)
        let ct = this.comparePositions(range.to, selected.to)

        console.log(cf, ct)

        mark.clear()
      })

      this.commit()
    },

    comparePositions (a, b) {
      return a.line !== b.line ? (a.line - b.line) : (a.ch - b.ch)
    },

    getSelectedRange () {
      const { editor } = this

      return {
        from: editor.getCursor('from'),
        to: editor.getCursor('to')
      }
    },

    getCurrentNoteMarks () {
      return this.editor.getAllMarks().map(mark => {
        let range = mark.find()
        let { className } = mark

        return { ...range, className }
      })
    },

    markSelectedText (options) {
      const { from, to } = this.getSelectedRange()
      this.editor.markText(from, to, options)
    },

    addMark (className) {
      this.markSelectedText({ className, addToHistory: true })
      this.commit()
    },

    commit () {
      let text = this.editor.getValue()
      let marks = this.getCurrentNoteMarks()
      let id = this.selectedNoteId

      if (this.selected && this.selected.value !== text) {
        this.$store.commit('NOTE_SET_TEXT', { id, text })
      }

      this.$store.commit('NOTE_SET_MARKS', { id, marks })
    }
  }
}
</script>
<style lang="scss">
input {
  @mixin placeholder() {
    font-weight: 400;
    color: #999;
  }

  &::-webkit-input-placeholder {
    @include placeholder();
  }

  &:-moz-placeholder { /* Firefox 18- */
    @include placeholder();
  }

  &::-moz-placeholder {  /* Firefox 19+ */
    @include placeholder();
  }

  &:-ms-input-placeholder {
    @include placeholder();
  }
}

.text-editor {
  min-height: 200px;
}

.CodeMirror.cm-s-default {
  width: 100%;
  min-height: 40px;
  font-family: 'Cardo', Georgia, serif;
  font-size: 16px;
  line-height: 1.5;
  height: auto;
}

.CodeMirror-selected {
  background-color: #B2D7FE !important;
}

.CodeMirror-selectedtext {
  color: white !important;
}

.CodeMirror-gutters {
  border-right: 0 !important;
  background: white !important;

  .CodeMirror-gutter.breakpoints {
    width: 30px;
    border-radius: 15px !important;
    background: white;

    transition: background 0.3s;
  }
}


.CodeMirror-placeholder {
  color: #999 !important;
}

.marker-bold {
  font-weight: 600;
}

.marker-yellow {
  background: rgba(255, 255, 119, 0.8);
}

.marker-underline {
  text-decoration: underline;
}
</style>
