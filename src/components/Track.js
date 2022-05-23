import React, { Component } from 'react'

const simple_style = {
  'fontSize': '70%',
  'textAlign': 'left',
  'marginLeft': '1%',
}
const simple_track_style = {
  'textDecoration': 'underline',
  'display': 'inline-block'

}
const simple_artist_style = {
  'display': 'inline-block'
}

class Track extends Component {
  render() {
    let track = this.props.track
    return (
      <div style={simple_style}>
        <p style={simple_track_style}>
          {track.name.slice(0, 24)}{track.end_char}
        </p>
        |
        <b style={simple_artist_style}>
          {track.artist.slice(0, 24)}
        </b>
      </div>
    )
  }
}

export default Track
