import React, { Component } from 'react'
import { FiPlayCircle, FiPauseCircle, FiRepeat } from 'react-icons/fi'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

import Spotify from 'spotify-web-api-js'

const spotify_api = new Spotify();

const minimal_style = {
    'outline': 'none',
    'border': 'none',
}

async function trackLiked(track) {
    const temp = await spotify_api.containsMySavedTracks([track.id]).then(function (data) {
        return data
    });
    return temp
}

class Player extends Component {
    render() {
        const current_track = this.props.current_track;
        let current_track_liked = false;

        console.log('curr:', current_track_liked)


        return (
            <>
                <div class='row' style={{ 'paddingTop': '20px' }}>

                    <div className='col-md' style={{ 'paddingBottom': '5px' }}>
                        <img src={current_track.album.images[1].url}
                            className='now-playing__cover' alt='' />
                    </div>

                    <div className='col-md' style={{ 'textAlign': 'right' }}>
                        <h2>[ current playback ]</h2>

                        <div className='now-playing__side'>
                            <div className='now-playing__name'>{
                                current_track.name
                            }</div>

                            <div className='now-playing__artist' style={{ 'fontWeight': 'bold' }}>{
                                current_track.artists[0].name
                            }</div>
                        </div>
                    </div>

                    <div className='col-md' >
                        <div>
                            <h2>[ controls ]</h2>

                            <button className='btn-spotify' style={minimal_style} onClick={() => { this.props.player.previousTrack() }} >
                                &lt;&lt;
                            </button>

                            <button className='btn-spotify' style={minimal_style} onClick={() => { this.props.player.togglePlay() }} >
                                {this.props.is_paused ? 'play' : 'pause'}
                            </button>

                            <button className='btn-spotify' style={minimal_style} onClick={() => { this.props.player.nextTrack() }} >
                                &gt;&gt;
                            </button>

                            <div className='row-sm' style={{ 'paddingLeft': '1%' }}>
                                {Promise.resolve(trackLiked(current_track)) ? <HiHeart size={24} /> : <HiOutlineHeart size={24} />}
                            </div>


                        </div>
                    </div>

                </div>
            </>
        )
    }

}

export default Player
