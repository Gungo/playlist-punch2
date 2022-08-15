import React, { Component } from 'react'
import Track from './Track.js'
import { play_something } from './Player.js'
import { GiSpeaker } from 'react-icons/gi'
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi'
import { MdRepeat, MdRepeatOn, MdRepeatOneOn } from 'react-icons/md'


const playlist_style = {
  'width': '100%',
  'padding': '4%',
  'textAlign': 'center',
  'marginBottom': '7%',
}

const right_column_style = {
  'paddingTop': '2%',
  'paddingLeft': '0',
  'paddingRight': '0',
  'right': '3%',
}

const btn_group_style = {
  'display': 'flex',
  'alignItems': 'center',
}

const ReactFitText = require('react-fittext');

// just for brevity
const random = () => Math.floor(Math.random() * 255);

let selected_playlists = []

// handle playlist select function
// @todo fix bug where doesn't re-render until search
async function handle_playlist_select(playlist) {
  // print selected
  console.log('Selected playlist: ', playlist)

  // update selected_playlists if not already selected
  selected_playlists.indexOf(playlist) == -1 ? selected_playlists.push(playlist) : console.log('Playlist already selected.')
  // play playlist based by context_uri
  const response = play_something(playlist.uri)

  // print all
  console.log('Selected playlists: ', selected_playlists)
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist

    // some text trimming
    playlist.end_char = (playlist.name.length > 32) ? '...' : ''
    playlist.tracks.map(track => {
      track.end_char = (track.name.length > 24) ? '...' : ''
    })

    // checks if some selected playlist matches this playlist
    function playlist_selected(playlist) {
      let fin =
        (selected_playlists[0] && selected_playlists.some(p => p.id === playlist.id))
          ? true : false
      // console.log("fin: ", fin, playlist)
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
        <img src={playlist.image} style={{ 'width': '100%' }} onClick={() => { handle_playlist_select(playlist) && this.forceUpdate() }} />

        {/* left side of playlist with tracks */}
        <div className='row' style={{ 'paddingTop': '2%', 'overflow-y': 'auto', 'max-height': '666px' }}>
          <div className='col-11' >
            {playlist.tracks.map(track =>
              <Track track={track} />
            )}
            <p style={{ 'textAlign': 'left', 'paddingLeft': '1%' }}>...</p>
          </div>

          {/* right side with buttons */}
          <div className="col-1" style={right_column_style}>
            <div className="btn-group-vertical" style={btn_group_style}>
              <FiPlayCircle size={30} onClick={() => { handle_playlist_select(playlist) && this.forceUpdate() }} />
              <br />
              <MdRepeat size={30} />
              <br />
              <MdRepeat size={30} />
              <br /><MdRepeat size={30} />
              <br />
            </div>
          </div>

          {/* playlist owner credit */}
          <div style={{ 'fontSize': '7px', 'paddingLeft': '4%' }}>
            <p>[ made by</p>
            <p style={{ 'fontWeight': 'bold' }}> {playlist.owner.display_name} ]</p>
          </div>
        </div>

        <br></br>

      </div >

    )
  }
}

export default Playlist
