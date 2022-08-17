import React, { Component } from 'react'
import { FaSpotify } from 'react-icons/fa'


class SpotifyButton extends Component {
    render() {
        return (
            <>
                <div style={{}}>
                    <a className="btn btn-outline" style={{ 'outline': 'none' }} href={this.props.url}>
                        <p style={{ 'fontWeight': 'bold' }}>{this.props.text}</p>
                    </a>
                    <FaSpotify />
                </div >
            </>

        )
    }
}

export default SpotifyButton
