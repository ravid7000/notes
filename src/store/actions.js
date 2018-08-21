import { map, filter } from 'lodash'
import Store from './index'
import DB from '../db'
import { uniqueIds } from './utils'
import { COLOR_KEY } from '../constants/local'
import * as Types from './types'

export function appLoading() {
  Store.dispatch({
    type: Types.APP_LOADING
  })
}

export function appError() {
  Store.dispatch({
    type: Types.APP_ERROR
  })
}

export async function fetchData() {
  appLoading()
  parseCurrentTheme()

  const dbData = await DB.allDocs({
    include_docs: true,
    descending: true
  })

  const data = map(dbData.rows, r => r.doc)

  window.setTimeout(() => {
    Store.dispatch({
      type: Types.APP_NOTES_LOADED,
      payload: data
    })
  }, 2000)
}

export function parseCurrentTheme () {
  const theme = JSON.parse(window.localStorage.getItem(COLOR_KEY))
  if (theme) {
    Store.dispatch({
      type: Types.UPDATE_THEME,
      payload: theme
    })
    document.body.className = 'dark'
  } else {
    document.body.className = ''
  }
}

export function toggleAddNewButton(state) {
  Store.dispatch({
    type: Types.TOGGLE_ADD_NEW,
    payload: state
  })
}

export function toggleEnterButton(state) {
  Store.dispatch({
    type: Types.TOGGLE_ENTER_BTN,
    payload: state
  })
}

export function handleSearchQuery(query, data) {
  if (query.indexOf('+') === 0) {
    toggleEnterButton(true)
  } else {
    if (query === '') {
      Store.dispatch({
        type: Types.UPDATE_NOTES,
        payload: data
      })
      toggleEnterButton(false)
    }
    Store.dispatch({
      type: Types.UPDATE_NOTES,
      payload: filter(data, d => d.text
        && d.text.toLowerCase().indexOf(query.toLowerCase()) > -1)
    })
  }
}

export function handleSearchEnterPress(query) {
  toggleEnterButton(false)
  if (query.indexOf('+') === 0) {
    const text = filter(query.split('+'), t => t !== '')
    if (text && text.length) {
      addNewNote(text[0])
    } else {
      toggleAddNewButton(true)
    }
  }
}

export function globalCommand(text) {
  Store.dispatch({
    type: Types.NEW_TEXT_NOTE_TYPE,
    payload: text
  })
}

export async function addNewNote(note) {
  const obj = {
    _id: uniqueIds(),
    text: note,
    completed: false
  }
  Store.dispatch({
    type: Types.ADD_NEW_NOTE,
    payload: obj
  })

  try {
    await DB.put(obj)
  } catch (error) {
    // no db
  }
}

export async function toggleNoteCompleted(note, allNotes) {
  try {
    const doc = await DB.get(note._id)
    DB.put({
      _id: note._id,
      _rev: doc._rev,
      text: note.text,
      completed: !note.completed
    })
  } catch (error) {
    // no db
  }
  Store.dispatch({
    type: Types.APP_NOTES_LOADED,
    payload: map(allNotes, n => {
      if (n._id === note._id) {
        n.completed = !note.completed
      }
      return n;
    })
  })
}

export async function removeNote (note, data) {
  Store.dispatch({
    type: Types.REMOVE_NOTE,
    payload: filter(data, d => d._id !== note._id)
  })
  try {
    await DB.remove(note)
  } catch (error) {
    // no db
  }
}

// function handleKeyboard() {
//   // eslint-disable-next-line no-console
//   // console.log(e)
// }

export function addKeyboardBindings() {
  // document.removeEventListener('keypress', handleKeyboard)
  // document.addEventListener('keypress', handleKeyboard)
}

export function toggleTheme (theme) {
  if (theme) {
    document.body.className = 'dark'
  } else {
    document.body.className = ''
  }
  Store.dispatch({
    type: Types.UPDATE_THEME,
    payload: theme
  })
  window.localStorage.setItem(COLOR_KEY, JSON.stringify(theme))
}