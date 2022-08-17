import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import SpotifyButton from './SpotifyButton.js'
import { FaSpotify } from 'react-icons/fa'

const sign_in_style = {
  'textAlign': 'center',
}

const player_wrapper_style = {
  'position': 'relative',
  'margin': '2% 8% 2% 8%',
  'height': '500px',
}

const react_player_style = {
  'position': 'absolute',
  'top': '0',
  'left': '0',
}

class SignInButton extends Component {
  render() {
    return (
      <>
        <div style={sign_in_style}>

          <a className="btn btn-outline" style={{ 'outline': 'none' }} onClick={() => {
            window.location = window.location.href.includes('localhost')
              ? 'http://localhost:8888/login'
              : 'https://playlist-punch2-backend.herokuapp.com/login'
          }} >
            <p style={{ 'fontWeight': 'bold' }}>[sign in with Spotify]</p>
          </a>
          <FaSpotify />

          <br />
          {/*  TV thing */}
          <div class="center rounded" style={player_wrapper_style}>
            {/* Render a Yadult swim youtube video */}
            <ReactPlayer playing={true} style={react_player_style}
              url='https://www.youtube.com/watch?v=ewZXPSCTJxU'

              controls={true}

              volume={0.01}
              width={'100%'}
              height={'100%'}
            />
          </div>

        </div>



      </>

    )
  }
}

export default SignInButton
