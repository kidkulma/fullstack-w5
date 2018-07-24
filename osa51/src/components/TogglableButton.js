import React from 'react'
import PropTypes from 'prop-types'

class TogglableButton extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }


  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={showWhenVisible}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default TogglableButton