import React, { Component } from 'react'

const sign_in_style = {
  'text-align': 'center',
  'float': 'right'
}

class LogoutButton extends Component {
  render() {
    return (

      <div style={sign_in_style}>
        <a href="https://accounts.spotify.com" class="btn btn-outline">
          <p style={{ 'font-weight': 'bold' }}>[logout]</p>
        </a>
      </div>

    )
  }
}

export default LogoutButton
