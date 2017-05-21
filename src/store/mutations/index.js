import notes    from './notes'
import Vue      from 'vue'
import session  from '@/modules/session'

export default {
  INITIALIZE (state) {
    let notes = session.restore()

    if (notes) {
      Vue.set(state, 'notes', notes)
    }
  },

  SET_SELECTED_NOTE (state, selected) {
    Vue.set(state, 'selectedNoteId', selected || null)
  },

  TOGGLE_SIDEBAR (state) {
    Vue.set(state, 'sidebarVisible', !state.sidebarVisible)
  },

  ...notes
}
