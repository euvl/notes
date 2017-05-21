import _ from 'lodash'

const debug = false
const storage = debug ? sessionStorage : localStorage

const cacheNotes = (notes) => {
  storage.setItem('notes', JSON.stringify(notes))
}

const update = _.debounce(cacheNotes, 1000)

const restore = () => {
  return JSON.parse(storage.getItem('notes') || 'null')
}

export default {
  update,
  updateNow: cacheNotes,
  restore
}
