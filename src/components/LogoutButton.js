import React, { Component } from 'react'

const sign_in_style = {
  'textAlign': 'center',
  'float': 'right'
}

class LogoutButton extends Component {
  render() {
    return (

      <div style={sign_in_style}>
        <a href='https://accounts.spotify.com' className='btn btn-outline' style={{ 'outline': 'none' }} >
          <p style={{ 'fontWeight': 'bold' }}>[logout]</p>
        </a>
      </div>

    )
  }
}

export default LogoutButton
