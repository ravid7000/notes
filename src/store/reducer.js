import { assign } from 'lodash'
import * as Types from './types'

const initialState = {
  loading: false,
  error: false,
  notes: [],
  originalNotes: [],
  showAddNote: false,
  showEnterBtn: false,
  newNoteText: '',
  theme: ''
}

export function Notes(state = assign({}, initialState), action) {
  switch(action.type) {
    case Types.APP_LOADING: {
      return assign({}, state, {
        loading: true,
        error: false
      })
    }
    case Types.APP_ERROR: {
      return assign({}, state, {
        loading: false,
        error: true
      })
    }
    case Types.APP_NOTES_LOADED: {
      return assign({}, state, {
        loading: false,
        error: false,
        notes: action.payload,
        originalNotes: action.payload
      })
    }
    case Types.TOGGLE_ADD_NEW: {
      if (action.newNote !== undefined) {
        return assign({}, state, {
          showAddNote: action.payload,
          newNoteText: action.newNote
        })
      }
      return assign({}, state, {
        showAddNote: action.payload
      })
    }
    case Types.TOGGLE_ENTER_BTN: {
      return assign({}, state, {
        showEnterBtn: action.payload
      })
    }
    case Types.NEW_TEXT_NOTE_TYPE: {
      return assign({}, state, {
        newNoteText: action.payload
      })
    }
    case Types.REMOVE_NOTE: {
      return assign({}, state, {
        notes: action.payload
      })
    }
    case Types.ADD_NEW_NOTE: {
      state.notes.unshift(action.payload)
      return assign({}, state)
    }
    case Types.UPDATE_NOTES: {
      return assign({}, state, {
        notes: action.payload
      })
    }
    case Types.UPDATE_THEME: {
      return assign({}, state, {
        theme: action.payload
      })
    }
    default: return assign({}, initialState)
  }
}