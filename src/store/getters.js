import util from '../util'

export default {
  selected (state) {
    return util.one(state.notes, state.selectedNoteId) || null
  },

  selectedIndex (state) {
    const {notes, selectedNoteId} = state

    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === selectedNoteId) {
        return i
      }
    }

    return -1
  }
}
