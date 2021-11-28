import React, { Component } from 'react'
import { play_something } from './Player.js'
import Track from './Track.js'
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi'
import { MdRepeat, MdRepeatOn, MdRepeatOneOn } from 'react-icons/md'
import { GiSpeaker } from 'react-icons/gi'

const playlist_style = {
  'width': '100%',
  'padding': '4%',
  'textAlign': 'center',
  'marginBottom': '10%',
}

const button_style = {
  'paddingTop': '4%',
  'right': 'auto'
  // 'right': '-0.25rem',
}
const ReactFitText = require('react-fittext');

// just for brevity, I would do this inline in practice.
const random = () => Math.floor(Math.random() * 255);

let selected_playlist = {}

// handle playlist select function
// @todo fix bug where doesn't re-render until search
async function handle_playlist_select(playlist) {
  // print contents
  console.log('Selected playlist: ', playlist)

  // update selected_playlists & play playlist based by context_uri 
  selected_playlist = playlist
  const response = play_something(playlist.uri)

}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist

    playlist.end_char = (playlist.name.length > 32) ? '...' : ''
    playlist.tracks.map(track => {
      track.end_char = (track.name.length > 24) ? '...' : ''
    })

    // boolean function true if selected playlist matches this playlist 
    function playlist_selected(playlist) {
      let fin = (selected_playlist && selected_playlist.id == playlist.id) ? true : false
      console.log("fin: ", fin, playlist)

      return fin
    }
    return (

      <div id='element' style={playlist_style} >

        {/* playlist title */}
        {(playlist_selected(playlist))
          ?
          <>
            <div className='row'>
              <div className='col-auto'>
                <h6 style={{ 'fontWeight': 'bold', 'color': `rgb(${random()}, ${random()}, ${random()})`, }}>
                  {playlist.name.slice(0, 32)}{playlist.end_char}</h6>
              </div>
              <div>
                <GiSpeaker size={28} style={{ 'paddingBottom': '8px' }} />
              </div>

            </div>
          </>
          :
          <>
            <ReactFitText minFontSize='8' maxFontSize='16px'>
              <h3 style={{ 'fontWeight': 'bold' }}>
                {playlist.name.slice(0, 32)}{playlist.end_char}</h3>
            </ReactFitText>
          </>
        }


        {/* image */}
        <img src={playlist.image} style={{ 'width': '100%' }} onClick={() => { }} />

        <div className='row' style={{ 'paddingTop': '2%' }}>
          {/* left side of playlist with tracks */}
          <div className='col-10' >
            {playlist.tracks.map(track =>
              <Track track={track} />
            )}
            <p style={{ 'textAlign': 'left', 'paddingLeft': '1%' }}>...</p>
          </div>

          {/* right side with buttons */}
          <div className="col-1 float-end">
            <div className="btn-group-vertical" style={button_style}>
              <FiPlayCircle size={30} onClick={() => { handle_playlist_select(this.props.playlist) && this.forceUpdate() }} />
              <br />
              <MdRepeat size={30} />
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
