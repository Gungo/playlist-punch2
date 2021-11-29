import React, { Component } from 'react'

class PlaylistCounter extends Component {
  render() {
    return (
      <div>
        {(this.props.playlists.length == 1)
          ? <h2>{this.props.playlists.length} playlist</h2>
          : <h2>{this.props.playlists.length} playlists</h2>
        }
      </div>
    );
  }
}

export default PlaylistCounter
