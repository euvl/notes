import _ from 'lodash'

export default {
  selected (state) {
    return _.find(state.notes, { id: state.selectedNoteId }) || null
  },

  selectedIndex (state) {
    const { notes, selectedNoteId } = state

    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === selectedNoteId) {
        return i
      }
    }

    return -1
  }
}
