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
    text: {
      handler: function (value) {
        this.value = value
        this.editor.setValue(this.value)

        this.$nextTick(() => {
          this.editor.refresh()
          this.editor.clearHistory()
        })
      }
    }
  },
  data () {
    return {
      value: this.text || '',
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
  mounted () {
    const editor = CodeMirror.fromTextArea(this.$refs.editable, {
      value: this.value,
      dragDrop: false,
      styleSelectedText: true,
      lineWrapping: true,
      gutters: ['breakpoints', 'CodeMirror-linenumbers']
    })

    const hideToolbar = (event) => {
      if (this.toolbar.isVisible) {
        this.toolbar.isVisible = false
      }
    }
    const mouseup = (event) => {
      this.$nextTick(() => {
        let { from, to } = editor.getSelectedRange()
        let el = document.querySelector('.CodeMirror')

        if (from.ch === to.ch && from.line === to.line) {
          this.toolbar.isVisible = false
          hideToolbar()
        } else {
          let posFrom = editor.charCoords(from)
          let posTo = editor.charCoords(to)

          let top = posFrom.top
          let left = 0

          if (from.line !== to.line) {
            let rect = el.getBoundingClientRect()
            left = rect.left + 0.5 * rect.width
          } else {
            console.log(`Put between ${from.ch} and ${to.ch}`)
            left = Math.round(posFrom.left + (posTo.left - posFrom.left) / 2)
          }

          this.toolbar.isVisible = true
          this.$set(this.toolbar, 'position', { left, top })
        }
      })

      event.preventDefault()
      document.removeEventListener('mouseup', mouseup)
    }

    editor.on('mousedown', (event) => {
      document.addEventListener('mouseup', mouseup)
    })

    editor.on('blur', hideToolbar)
    editor.on('keydown', hideToolbar)

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

    editor.on('change', (event, change) => {
      this.value = editor.getValue()

      this.$emit('change', {
        value: this.value,
        srcEvent: event,
        editor,
        change
      })
    })

    this.editor = editor
    this.$emit('initialized', {editor: this.editor})
  },
  methods: {
    focusEditor () {
      this.editor.focus()
    },

    clean () {
      const {from, to} = this.editor.getSelectedRange()
      const marks = this.editor.findMarks(from, to)

      for (var i = 0; i < marks.length; i++) {
        marks[i].clear()
      }
    },

    applyMarker (name) {
      this.editor.markSelectedText({
        className: name,
        addToHistory: true
      })
    },

    underline () {
      this.applyMarker('txt-underline')
    },

    bolden () {
      this.applyMarker('txt-bold')
    },

    highlight () {
      this.applyMarker('txt-yellow')
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

    &:hover {
    //  background: mix(#506782, white, 10%);
    }
  }
}


.CodeMirror-placeholder {
  color: #999 !important;
}

.txt-bold {
  font-weight: 600;
}

.txt-yellow {
  background: #ff7;
}

.txt-underline {
  text-decoration: underline;
}
</style>
