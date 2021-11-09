import React, { Component } from 'react'

const sign_in_style = {
  'text-align': 'center',
}

class SignInButton extends Component {
  render() {
    return (

      <div style={sign_in_style}>

        <button class="btn btn-outline" onClick={() => {
          window.location = window.location.href.includes('localhost')
            ? 'http://localhost:8888/login'
            : 'https://playlist-punch-backend.herokuapp.com/login'
        }} >
          <p style={{ 'font-weight': 'bold' }}>[sign in with Spotify]</p>
        </button>
      </div>


    )
  }
}

export default SignInButton
