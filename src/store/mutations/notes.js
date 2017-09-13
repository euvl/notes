import Vue            from 'vue'
import _              from 'lodash'
import { createNote } from '@/factories/note'
import session  from '@/modules/session'

const findById = (collection, id) =>
  _.find(collection, { id }) || null

export default {
  INITIALIZE (state) {
    let notes = session.restore()

    if (notes) {
      state.notes = notes
    }
  },

  NOTE_SET_TEXT (state, { id, text }) {
    var note = findById(state.notes, id)

    if (note) {
      Vue.set(note, 'text', text)
      Vue.set(note, 'modifiedAt', Date.now())
    }
  },

  NOTE_SET_TITLE (state, { id, title }) {
    var note = findById(state.notes, id)

    if (note) {
      Vue.set(note, 'title', title)
      Vue.set(note, 'modifiedAt', Date.now())
    }
  },

  NOTE_SET_MARKS (state, { id, marks }) {
    var note = findById(state.notes, id)

    if (note) {
      Vue.set(note, 'marks', marks)
    }
  },

  NOTE_TOGGLE_STAR (state, id) {
    var note = findById(state.notes, id)

    if (note) {
      Vue.set(note, 'isStarred', !note.isStarred)
    }
  },

  NOTE_CREATE (state) {
    var note = createNote()

    state.notes.push(note)
    state.selectedNoteId = note.id
  },

  NOTE_REMOVE (state) {
    let { notes, selectedNoteId } = state
    let index = _.findIndex(notes, {id: selectedNoteId})

    if (index !== -1) {
      notes.splice(index, 1)

      if (notes.length > 0) {
        let nextIndex = Math.max(index - 1, 0)
        let nextId = notes[nextIndex].id

        state.selectedNoteId = nextId
      } else {
        state.selectedNoteId = null
      }
    }
  }
}
