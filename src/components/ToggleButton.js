import React, { Component } from 'react'
import {
  enable as enableDarkMode,
} from 'darkreader';
enableDarkMode({ brightness: 85, contrast: 110, sepia: 45 })

class ToggleButton extends Component {
  render() {
    this.state = {
      dark_mode: true
    }
    return (
      <button style={{ 'margin-top': '1%' }} className='btn btn-outline-light' onClick={() => {
        this.state.dark_mode
          ? enableDarkMode({ brightness: 110, contrast: -75, sepia: 105 })
          : enableDarkMode({ brightness: 85, contrast: 110, sepia: 45 })
        this.state.dark_mode = !this.state.dark_mode
      }
      }>
        dark/light
      </button>
    )
  }
}

export default ToggleButton
