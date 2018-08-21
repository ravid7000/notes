import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const Button = props => {
  const { children, onClick, lg, tabIndex } = props;
  if (lg) {
    return (
      <button className="notes-button lg" onClick={onClick} tabIndex={tabIndex}>
        {children}
      </button>
    )
  }
  return (
    <button className="notes-button" onClick={onClick} tabIndex={tabIndex}>
      {children}
    </button>
  )
}

const ButtonWhite = props => {
  const { children, onClick, lg, tabIndex } = props;
  if (lg) {
    return (
      <button
        className="notes-button lg btn-white"
        onClick={onClick}
        tabIndex={tabIndex}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      className="notes-button lg btn-white"
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  )
}

const ButtonFab = props => {
  const { children, onClick } = props;
  return (
    <button className="notes-button-fab" onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  onClick: PropTypes.func,
  lg: PropTypes.bool,
  tabIndex: PropTypes.number
}
ButtonWhite.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  onClick: PropTypes.func,
  lg: PropTypes.bool,
  tabIndex: PropTypes.number
}

ButtonFab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  onClick: PropTypes.func
}

export { ButtonFab, ButtonWhite }
export default Button;