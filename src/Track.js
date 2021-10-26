import React, {Component} from 'react'

const simple_track_style = {
  'font-size': '70%',
  'text-align': 'left',
  'margin-left': '1%',
  'margin-top': '2%',
  'text-decoration': 'underline'
}

class Track extends Component {
  render() {
    let track = this.props.track
    return(
      <div style={simple_track_style}>
        {track.name.slice(0,24)}{track.end_char}
      </div>
    )
  }
}

export default Track
