import React from 'react'
import Logo from '../../assets/logo.svg'
import './index.scss'

const Loader = () => (
  <div className="app-loading">
    <img src={Logo} alt="" />
  </div>
)

export default Loader