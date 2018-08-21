import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import Button, { ButtonWhite } from '../Button'
import TrashIcon from '../../assets/trash-icon.svg'

const AddNote = props => {
  return (
    <div className="add-note-textarea">
      <textarea {...props.textareaProps}>
        {props.children}
      </textarea>
      <div className="controls">
        <Button lg onClick={props.submit}>Save</Button>
        <ButtonWhite lg onClick={props.cancel}>
          <img src={TrashIcon} alt=""/>
        </ButtonWhite>
      </div>
    </div>
  )
}

AddNote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  textareaProps: PropTypes.object,
  submit: PropTypes.func,
  cancel: PropTypes.func
}

export default AddNote;