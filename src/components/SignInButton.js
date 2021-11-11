import React, { Component } from 'react'
import { FaSpotify } from 'react-icons/fa'

const sign_in_style = {
  'text-align': 'center',
}

class SignInButton extends Component {
  render() {
    return (

      <div style={sign_in_style}>

        <a class="btn btn-outline" style={{ 'outline': 'none' }} onClick={() => {
          window.location = window.location.href.includes('localhost')
            ? 'http://localhost:8888/login'
            : 'https://playlist-punch-backend.herokuapp.com/login'
        }} >
          <p style={{ 'font-weight': 'bold' }}>[sign in with Spotify]</p>
        </a>
        <FaSpotify />
      </div>


    )
  }
}

export default SignInButton
