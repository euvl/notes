export default {
  SET_SELECTED_NOTE (state, selected) {
    state.selectedNoteId = selected || null
  },

  TOGGLE_SIDEBAR (state) {
    state.sidebarVisible = !state.sidebarVisible
  },

  SET_CONFIG (state, { key, value }) {
    state.config = { ...state.config, [key]: value }
  },

  TOGGLE_NIGHT_MODE (state) {
    state.config = {
      ...state.config,
      mode: state.config.mode === 'day' ? 'night' : 'day'
    }
  },

  SET_SIDEBAR_SEARCH (state, value) {
    state.sidebarSearch = value
  }
}
