import React, { Component } from 'react'

class HoursCounter extends Component {
  render () {
    // reduces something to a single value -- reduce playlist to list of songs
    let all_tracks = this.props.playlists.reduce((tracks, each_playlist) => {
      return tracks.concat(each_playlist.tracks)
    }, [])
    let total_duration_ms = all_tracks.reduce((sum, each_track) => {
      return sum + each_track.duration_ms
    }, 0)
    let total_hours = Math.round((total_duration_ms/1000/3600)*100)/100

    return (
      <div>
        <h3>{total_hours} hours</h3>
      </div>
    )
  }
}

export default HoursCounter
