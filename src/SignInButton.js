import React, { Component } from 'react'


class SignInButton extends Component {
  render() {
    return (
      <button className='btn btn-outline-light' onClick={() => {
        window.location = window.location.href.includes('localhost')
          // @todo CHANGE THIS
          ? 'http://localhost:8888/login'
          // ? 'https://playlist-punch-backend.herokuapp.com/login'
          : 'https://playlist-punch-backend.herokuapp.com/login'
      }
      } >

        Sign in with Spotify
      </button>
    )
  }
}

export default SignInButton
