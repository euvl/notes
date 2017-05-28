import { ID } from '../util'

export const createNote = (title = '', text = '') => {
  let id = ID()
  let now = Date.now()

  return {
    id,
    title,
    text,
    marks: [],
    isStarred: false,
    createdAt: now,
    modifiedAt: now
  }
}
