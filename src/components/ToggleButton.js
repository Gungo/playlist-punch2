import React, { Component } from 'react'
import {
  enable as enableDarkMode,
} from 'darkreader';
// MONEY SPOT -- HAD TO REVERSE ENGINEER THIS SHIT WItH FUCKING PIXEL DROPPER TO MAKE SURE
// SPOTIFY's STUPID LOGO IS rgb(30, 215, 96) !!!!!
enableDarkMode({ brightness: 77, contrast: 172, })

class ToggleButton extends Component {
  render() {
    this.state = {
      dark_mode: true
    }
    return (
      <>
        <button>dark mode disabled for spotify logo compatibility</button>
      </>
    )
    //   return (
    //     <button style={{ 'marginTop': '1%' }} className='btn btn-outline-light' onClick={() => {
    //       this.state.dark_mode
    //         ? enableDarkMode({ brightness: 180, contrast: -85, sepia: 115 }) // light
    //         : enableDarkMode({ brightness: 85, contrast: 110, sepia: 45 }) // dark
    //       this.state.dark_mode = !this.state.dark_mode
    //     }
    //     }>
    //       dark mode for spotify logo compatibility*
    //     </button>
    //   )
    // }
  }
}

export default ToggleButton
