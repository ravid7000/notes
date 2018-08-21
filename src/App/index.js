import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.scss'
import Connect from '../store/connect'
// actions
import {
  toggleAddNewButton,
  handleSearchQuery,
  handleSearchEnterPress,
  toggleEnterButton,
  globalCommand,
  addNewNote,
  toggleNoteCompleted,
  removeNote,
  toggleTheme
} from '../store/actions'
// components
import Header from '../Components/Header'
import Note from '../Components/Note'
import SearchBox from '../Components/SearchBox'
import { ButtonFab } from '../Components/Button'
import AddNote from '../Components/AddNote'
import Loader from '../Components/Loader'
import AddIcon from '../assets/add-key.svg'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: _.slice([], 0),
      searchQuery: '',
      textareaText: ''
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.newNoteText) {
      this.setState({ textareaText: props.newNoteText })
    }
  }

  handleNoteCompleted = (item) => {
    toggleNoteCompleted(item, this.props.notes)
  }

  handleRemoveNote = (item) => {
    removeNote(item, this.props.notes)
  }

  handleSearchBoxInput = e => {
    this.setState({
      searchQuery: e.target.value
    })
    handleSearchQuery(e.target.value, this.props.originalNotes)
  }

  handleSearchBoxEnter = () => {
    handleSearchEnterPress(
      this.state.searchQuery,
      this.props.notes,
      this.props.originalNotes
    )
    this.setState({
      searchQuery: ''
    })
    toggleEnterButton(false)
  }

  handleTextArea = e => {
    this.setState({
      textareaText: e.target.value
    })
    if (this.props.newNoteText)
      globalCommand('')
  }

  handleTextAreaKeyDown = e => {
    if (e.which === 27) {
      this.cancelAddNote()
    }
  }

  submitNewNote = () => {
    addNewNote(this.state.textareaText)
    toggleAddNewButton(false)
    this.setState({
      textareaText: ''
    })
  }

  cancelAddNote = () => {
    toggleAddNewButton(false)
    this.setState({
      textareaText: ''
    })
  }

  handleLogoClick = () => {
    toggleTheme(this.props.theme === 'dark' ? '' : 'dark')
  }

  render() {
    const { notes, showAddNote, showEnterBtn, loading } = this.props;

    if (loading) {
      return <Loader />
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="note-loading-anim"
        transitionEnterTimeout={100}
        transitionLeaveTimeout={100}
      >
      {
        loading
        ? <Loader key={0} />
        : <div key={1} className="wrapper">
            <Header logoClick={this.handleLogoClick} />
            <div className="container">
              <SearchBox
                inputProps={{
                  type: 'text',
                  placeholder: 'Type...',
                  value: this.state.searchQuery,
                  onChange: this.handleSearchBoxInput
                }}
                showEnter={showEnterBtn}
                enterPress={this.handleSearchBoxEnter}
              />
              {showAddNote &&
                <AddNote
                  textareaProps={{
                    placeholder: 'Add new note',
                    autoFocus: true,
                    value: this.state.textareaText,
                    onChange: this.handleTextArea,
                    onKeyDown: this.handleTextAreaKeyDown
                  }}
                  submit={this.submitNewNote}
                  cancel={this.cancelAddNote}
                />
              }
              {
                notes.length
                ? _.map(notes, (part, index) => (
                  <Note
                    key={index}
                    completed={part.completed}
                    complete={() => this.handleNoteCompleted(part)}
                    removeNote={() => this.handleRemoveNote(part)}
                  >
                    {part.text}
                  </Note>
                ))
                : <div className="no-notes">
                  Click + to add new note.
                </div>
              }
            </div>
            <div className="add-button">
              <ButtonFab onClick={() => toggleAddNewButton(true)}>
                <img src={AddIcon} width={20} />
              </ButtonFab>
            </div>
          </div>
      }
      </ReactCSSTransitionGroup>
    )
  }
}

App.propTypes = {
  notes: PropTypes.array,
  originalNotes: PropTypes.array,
  showAddNote: PropTypes.bool,
  showEnterBtn: PropTypes.bool,
  loading: PropTypes.bool,
  newNoteText: PropTypes.string,
  theme: PropTypes.string
}

export default Connect(App)