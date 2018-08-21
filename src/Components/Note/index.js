import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.scss'
import CheckIcon from '../../assets/check-icon.svg'
import TrashIcon from '../../assets/trash-icon.svg'

const Note = props => {
  return (
    <div className="note">
      <div
        className="note-left-icon"
        onClick={props.complete}
      >
        <ReactCSSTransitionGroup
          transitionName="notes-checkbox"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
        {
          props.completed
          ? <img key={0} src={CheckIcon} />
          : <span key={1} className="checkbox" />
        }
        </ReactCSSTransitionGroup>
      </div>
      <div className={`content${props.completed ? ' faded' : ''}`}>
        {props.children}
      </div>
      <div className="note-right-icon" onClick={props.removeNote}>
        <img src={TrashIcon} />
      </div>
    </div>
  )
}

Note.propTypes = {
  children: PropTypes.string,
  completed: PropTypes.bool,
  complete: PropTypes.func,
  removeNote: PropTypes.func
}

export default Note;