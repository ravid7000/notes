import React from 'react'
import { render } from 'react-dom'
import './styles/index.scss'
import { addKeyboardBindings, fetchData } from './store/actions'

fetchData();
addKeyboardBindings();
import App from './App'

render(<App />, document.getElementById('app'))
