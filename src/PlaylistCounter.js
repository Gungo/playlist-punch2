import React, { Component } from 'react'

class PlaylistCounter extends Component {
  render () {
    return (
      <div>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

export default PlaylistCounter
