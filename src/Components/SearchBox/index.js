import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import SearchIcon from '../../assets/search-icon.svg'
import EnterKeyIcon from '../../assets/enter-key.svg'
import Button from '../Button'

class SearchBox extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.input = null;
  }

  shouldComponentUpdate(props) {
    if (props.setFocus) {
      this.setInputFocus()
    }
    return true;
  }

  componentDidMount() {
    if (this.props.setFocus) {
      this.setInputFocus()
    }
  }

  setInputFocus = () => {
    if (this.input) {
      window.setTimeout(() => {
        this.input.focus()
      }, 300)
    }
  }

  handleInput(e) {
    if (e.which === 13 && this.props.enterPress) {
      this.props.enterPress(e.target.value)
      e.preventDefault();
    }
  }

  render() {
    const { props } = this;

    return (
      <div className="search-box-container">
        <div className="search-box">
          <div className="search-box-left-icon">
            <img src={SearchIcon} />
          </div>
          <input
            ref={e => this.input = e}
            {...props.inputProps}
            onKeyDown={e => this.handleInput(e)}
          />
          {props.showEnter &&
            <div className="search-box-right-icon">
              <Button onClick={props.enterPress} tabIndex={-1}>
                <img src={EnterKeyIcon} />
              </Button>
            </div>
          }
        </div>
      </div>
    )
  }
}

SearchBox.propTypes = {
  setFocus: PropTypes.bool,
  inputProps: PropTypes.object,
  enterPress: PropTypes.func,
  showEnter: PropTypes.bool
}

export default SearchBox;