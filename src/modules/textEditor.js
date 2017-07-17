import CodeMirror from 'codemirror'

export default (textArea, params) => {
  let editor = CodeMirror.fromTextArea(textArea, params)

  editor.getSelectedRange = () => {
    return {
      from: editor.getCursor('from'),
      to: editor.getCursor('to')
    }
  }

  editor.markSelectedText = (options) => {
    const { from, to } = editor.getSelectedRange()
    this.editor.markText(from, to, options)
  }

  editor.cleanMark = (mark, from, to) => {
    if (!from) {
      mark.clear()
      return
    }

    let range = mark.find()

    if (!to) {
      to = range.to
    }
  }
}
