import React, { Component } from 'react'
import PlaylistCounter from './PlaylistCounter.js'
import LogoutButton from './LogoutButton.js'
import HoursCounter from './HoursCounter.js'
import GungoDevButton from './GungoDevButton.js'
import ToggleButton from './ToggleButton.js'

class Header extends Component {
    render() {

        return (
            <div>
                <LogoutButton />
                <h1><u>{this.props.data.user.name}</u> | <i>   Playlist Punch  </i></h1>
                <PlaylistCounter playlists={this.props.playlists} />
                <HoursCounter playlists={this.props.playlists} />
                <GungoDevButton />
                <ToggleButton />
            </div>

        )
    }
}

export default Header
