import Vue            from 'vue'
import util           from '@/util'
import { createNote } from '@/factories/note'

export default {
  NOTE_SET_TEXT (state, {id, text}) {
    var note = util.one(state.notes, id)

    if (note) {
      Vue.set(note, 'text', text)
      Vue.set(note, 'modifiedAt', Date.now())
    }
  },

  NOTE_SET_TITLE (state, {id, title}) {
    var note = util.one(state.notes, id)

    if (note) {
      Vue.set(note, 'title', title)
      Vue.set(note, 'modifiedAt', Date.now())
    }
  },

  NOTE_SET_MARKS (state, {id, marks}) {
    var note = util.one(state.notes, id)

    if (note) {
      Vue.set(note, 'marks', marks)
    }
  },

  NOTE_TOGGLE_STAR (state, id) {
    var note = util.one(state.notes, id)

    if (note) {
      Vue.set(note, 'isStarred', !note.isStarred)
    }
  },

  NOTE_CREATE (state) {
    var note = createNote()
    state.notes.push(note)
    Vue.set(state, 'selectedNoteId', note.id)
  },

  NOTE_REMOVE (state) {
    let { notes, selectedNoteId } = state
    let nextId = null
    let cleaned = []

    notes.forEach((note, i) => {
      if (note.id === selectedNoteId) {
        if (notes.length > 1) {
          nextId = notes[i + (i === 0 ? 1 : -1)].id
        }
      } else {
        cleaned.push(note)
      }
    })

    Vue.set(state, 'notes', cleaned)
    Vue.set(state, 'selectedNoteId', nextId)
    // TODO: somehow call another mutation SET_SELECTED_NOTE
    // mb it shoud be separated into action ???
  }
}
