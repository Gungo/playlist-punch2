import React, { Component } from 'react'
import PlaylistCounter from './PlaylistCounter.js'
import HoursCounter from './HoursCounter.js'
import ToggleButton from './ToggleButton.js'

class Header extends Component {
    render() {

        return (
            <div>
                <h1><u>{this.props.data.user.name}</u></h1>
                <PlaylistCounter playlists={this.props.playlists} />
                <HoursCounter playlists={this.props.playlists} />
                <ToggleButton />
            </div>

        )
    }
}

export default Header
