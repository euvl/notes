import notes    from './notes'
// import marker   from './marker'
// import Vue      from 'vue'
import session  from '@/modules/session'

export default {
  INITIALIZE (state) {
    let notes = session.restore()

    if (notes) {
      state.notes = notes
    }
  },

  SET_SELECTED_NOTE (state, selected) {
    state.selectedNoteId = selected || null
  },

  TOGGLE_SIDEBAR (state) {
    state.sidebarVisible = !state.sidebarVisible
  },

  ...notes
}
