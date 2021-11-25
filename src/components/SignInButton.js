import React, { Component } from 'react'
import { FaSpotify } from 'react-icons/fa'

const sign_in_style = {
  'textAlign': 'center',
}

class SignInButton extends Component {
  render() {
    return (

      <div style={sign_in_style}>

        <a className="btn btn-outline" style={{ 'outline': 'none' }} onClick={() => {
          window.location = window.location.href.includes('localhost')
            ? 'http://localhost:8888/login'
            : 'https://playlist-punch2-backend.herokuapp.com/login'
        }} >
          <p style={{ 'fontWeight': 'bold' }}>[sign in with Spotify]</p>
        </a>
        <FaSpotify />
      </div>


    )
  }
}

export default SignInButton
