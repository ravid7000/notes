import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

import Logo from '../../assets/logo.svg'

const Header = props => {
  return (
    <div className="notes-header">
      <div className="logo">
        <img src={Logo} onClick={props.logoClick} />
        <span className="logo-text">
          Notes
        </span>
      </div>
    </div>
  )
}

Header.propTypes = {
  logoClick: PropTypes.func
}

export default Header