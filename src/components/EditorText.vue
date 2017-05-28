<template>
  <div class="text-editor" @click="focusEditor">
    <text-editor-toolbar
      :params="toolbar"
      @color="highlight"
      @underline="underline"
      @bold="bolden"
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
        // this.value = id ? this.selected.text : ''
        // console.log(this.editor)
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
//  watch: {
/*
text: {
      handler: function (value) {
        this.value = value
        this.editor.setValue(this.value)

        console.log(this.selected.marks)

        let marks = this.selected.marks

        if (marks) {
          marks.forEach(mark => {
            let { from, to, className } = mark

            this.editor.markText(from, to, {
              className,
              addToHistory: false
            })
          })
        }

        this.$nextTick(() => {
          this.editor.refresh()
          this.editor.clearHistory()
        })
      }
*/
//  }
//  },
  data () {
    return {
    //  value: '',
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
    ...mapState(['selectedNoteId'])
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

        let top = posFrom.top
        let left = 0

        if (from.line !== to.line) {
          let rect = el.getBoundingClientRect()
          left = rect.left + 0.5 * rect.width
        } else {
          left = Math.round(posFrom.left + (posTo.left - posFrom.left) / 2)
        }

        this.toolbar.isVisible = true
        this.$set(this.toolbar, 'position', { left, top })
      })

      event.preventDefault()
      document.removeEventListener('mouseup', mouseup)
    }

    editor.on('mousedown', (event) => {
      document.addEventListener('mouseup', mouseup)
    })
    /*
    // editor.on('change', (event) => {
    //   console.log(event)
    // })
    */

    editor.on('blur', this.hideToolbar)

    editor.on('keyup', (event) => {
      let cursor = editor.getCursor()
      let lineText = editor.getLine(cursor.line)
      let nextCursorPos = cursor.ch

      let transformedText = transformText(lineText, (event) => {
        nextCursorPos = event.position + event.replacement.length
      })

      if (lineText !== transformedText) {
        var start = { line: cursor.line, ch: 0 }
        var end = { line: cursor.line, ch: lineText.length }

        editor.replaceRange(transformedText, start, end)
        editor.setCursor({ line: cursor.line, ch: nextCursorPos })
      }

      this.hideToolbar()
    })

    /*
    editor.getSelectedRange = () => {
      return {
        from: editor.getCursor('from'),
        to: editor.getCursor('to')
      }
    }

    editor.markSelectedText = (options) => {
      const { from, to } = editor.getSelectedRange()
      editor.markText(from, to, options)
      return { from, to }
    }

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

      let value = this.editor.getValue()
      let marks = this.getCurrentNoteMarks()

      this.commit({ value, marks })
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

      marks.forEach(mark => { mark.clear() })
    },

    getSelectedRange () {
      let { editor } = this

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

      let value = this.editor.getValue()
      let marks = this.getCurrentNoteMarks()

      this.commit({ value, marks })
    },

    underline () {
      this.addMark('marker-underline')
    },

    bolden () {
      this.addMark('marker-bold')
    },

    highlight () {
      this.addMark('marker-yellow')
    },

    commit ({ value, marks }) {
      let id = this.selectedNoteId

      if (this.selected && this.selected.value !== value) {
        this.$store.commit('NOTE_SET_TEXT', {
          id,
          text: value
        })
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
  background: #ff7;
}

.marker-underline {
  text-decoration: underline;
}
</style>
