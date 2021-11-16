import React, { Component } from 'react'
import Track from './Track.js'
import { GiPlayButton, GiPauseButton, GiPlantRoots, GiCycle, GiDandelionFlower } from "react-icons/gi";
import { FiPlayCircle, FiPauseCircle, FiRepeat, } from 'react-icons/fi'

const playlist_style = {
  'width': '100%',
  'padding': '4%',
  'textAlign': 'center',
  'marginBottom': '10%',
}

const button_style = {
  'paddingTop': '4%',
  'margin': '4%',
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

        {/* playlist title */}
        <ReactFitText minFontSize='8' maxFontSize='16px'>
          <h3 style={{ 'fontWeight': 'bold' }}>
            {playlist.name.slice(0, 32)}{playlist.end_char}</h3>
        </ReactFitText>

        {/* image */}
        <img src={playlist.image} style={{ 'width': '100%' }} />

        <div className="row">
          {/* left side of playlist with tracks */}
          <div class="col-md">
            {playlist.tracks.map(track =>
              <Track track={track} />
            )}
            <p style={{ 'textAlign': 'left', 'padding': '1.5%' }}>...</p>
          </div>

          {/* right side with buttons */}
          <div className="col-xsm" style={{ 'textAlign': 'right', 'padding': '15px' }}>
            <div className="btn-group-vertical" style={button_style}>
              <FiPlayCircle size={30} />
              <br />
              <FiRepeat size={30} />
              <br />
              {/* <GiPlantRoots size={30} />
              <br />
              <GiDandelionFlower size={30} />
              <br /> */}
            </div>
          </div>

        </div>

        <br></br>

      </div >

    )
  }
}

export default Playlist
