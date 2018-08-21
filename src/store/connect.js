import { Component, createElement } from 'react'
import Store from './index';  // using createStore of redux

// hoc
function connect(WrappedComponent) {
  return class connect extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: Store.getState()
      };
      this.store = null;
      this.initSelector();
    }

    componentDidMount() {
      this.store = Store.subscribe(() => {
        this.setState({
          data: Store.getState()
        })
      })
    }

    componentWillUnmount() {
      if (this.store) this.store();
    }

    initSelector() {
      this.selector = WrappedComponent
    }

    render() {
      const props = {
        ...this.state.data,
        ...this.props
      }
      this.selector.shouldComponentUpdate = false
      return createElement(this.selector, props);
    }
  };
}

export default connect;