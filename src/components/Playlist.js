import React, { Component } from 'react'
import Track from './Track.js'
import { GiPlayButton, GiPauseButton, GiPlantRoots, GiCycle, GiDandelionFlower } from "react-icons/gi";
import { FiPlayCircle, FiPauseCircle, FiRepeat, } from 'react-icons/fi'

const playlist_style = {
  'width': '100%',
  'padding': '4%',
  'text-align': 'center',
  'margin-bottom': '10%',
}

const button_style = {
  'padding-top': '4%',
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
          <h3 style={{ 'font-weight': 'bold' }}>
            {playlist.name.slice(0, 32)}{playlist.end_char}</h3>
        </ReactFitText>

        {/* image */}
        <img src={playlist.image} style={{ 'width': '100%' }} />

        <div class="row">
          {/* left side of playlist with tracks */}
          <div class="col-md">
            {playlist.tracks.map(track =>
              <Track track={track} />
            )}
            <p style={{ 'text-align': 'left', 'padding': '1.5%' }}>...</p>
          </div>

          {/* right side with buttons */}
          <div class="col-xsm" style={{ 'text-align': 'right', 'padding': '5%' }}>
            <div class="btn-group-vertical" style={button_style}>
              <FiPlayCircle size={36} />
              <br />
              <FiRepeat size={36} />
              <br />
              <GiPlantRoots size={36} />
              <br />
              <GiDandelionFlower size={36} />
              <br />
            </div>
          </div>

        </div>

        <br></br>

      </div >

    )
  }
}

export default Playlist
