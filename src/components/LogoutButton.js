import React, { Component } from 'react'

const sign_in_style = {
  'textAlign': 'center',
  'float': 'right'
}

class LogoutButton extends Component {
  render() {
    return (

      <div style={sign_in_style}>
        <a href='https://accounts.spotify.com' style={{ 'outline': 'none' }} class='btn btn-outline'>
          <p style={{ 'fontWeight': 'bold' }}>[logout]</p>
        </a>
      </div>

    )
  }
}

export default LogoutButton
