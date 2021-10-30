import React, { Component } from 'react'
import ReactScrollableList from 'react-scrollable-list'
import Track from './Track.js'



const playlist_style = {
  'width': '100%',
  'padding': '4%',
  'text-align': 'center',
  'margin-bottom': '10%',
}

const ReactFitText = require('react-fittext');

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    playlist.end_char = (playlist.name.length > 32) ? '...' : ''
    playlist.tracks.map(track => {
      track.end_char = (track.name.length > 24) ? '...' : ''
    })
    return (
      <div id='element' style={playlist_style}>
        <ReactFitText minFontSize='8' maxFontSize='16px'>
          <h3 style={{ 'font-weight': 'bold' }}>
            {playlist.name.slice(0, 32)}{playlist.end_char}</h3>
        </ReactFitText>
        <img src={playlist.image} style={{ 'width': '100%' }} />
        {playlist.tracks.map(track =>
          <Track track={track} />
        )}
        <p style={{ 'text-align': 'left', 'padding': '1.5%' }}>...</p>
        <br></br>


      </div>
    )
  }
}

export default Playlist
