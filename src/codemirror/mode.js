import CodeMirror from 'codemirror'

CodeMirror.defineMode('enhanced-note', function () {
  return {
    startState: function () {
      return {
        inString: false
      }
    },
    token: function (stream, state) {
      if (!state.inString && stream.peek() === '#') {
        stream.next()
        state.inString = true
      }

      if (state.inString) {
        if (stream.skipTo(' ')) {
          stream.next()
          state.inString = false
        } else {
          stream.skipToEnd()
        }

        return 'keyword'
      } else {
        stream.skipTo('#') || stream.skipToEnd()

        return null
      }
    }
  }
})

export default {}
