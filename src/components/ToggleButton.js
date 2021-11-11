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
      <button style={{ 'marginTop': '1%' }} className='btn btn-outline-light' onClick={() => {
        this.state.dark_mode
          ? enableDarkMode({ brightness: 180, contrast: -85, sepia: 115 }) // light
          : enableDarkMode({ brightness: 85, contrast: 110, sepia: 45 }) // dark
        this.state.dark_mode = !this.state.dark_mode
      }
      }>
        dark/light
      </button>
    )
  }
}

export default ToggleButton
