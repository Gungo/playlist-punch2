import React, { Component, useState, useEffect } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { MdShuffle, MdShuffleOn } from 'react-icons/md'
import { handle_playlist_select } from './Playlist'
import Spotify from 'spotify-web-api-js'

const spotify_api = new Spotify()

const minimal_style = {
    'outline': 'none',
    'border': 'none',
}



// play something by context_uri
export async function play_something(context_uri) {
    // example for playlist
    // 'spotify:playlist:6PliLQS2cUWDbEJjcF1gXN'
    console.log('uri: ', context_uri)
    const response = await spotify_api.play({ context_uri }).then(
        function (response) {
            console.log('Playing: ', response)
        },
        function (err) {
            console.error(err);
        }
    )

    return response
}



function Player(props) {

    const [current_track_liked, set_current_track_liked] = useState(false)

    // hook to get current track within likes info
    useEffect(() => {
        async function is_current_track_liked() {
            const response = await spotify_api.containsMySavedTracks([props.current_track.id])

            set_current_track_liked(response[0])
        }
        is_current_track_liked()

    }, [props.current_track]) // hook occurs whenever current_track changes (i think)

    // adds track to library
    async function save_track(track) {
        console.log("Saving track: ", track)
        const response = await spotify_api.addToMySavedTracks([track.id])

        set_current_track_liked(true)

    }

    // removes track from library
    async function remove_track(track) {
        console.log("Removing track: ", track)
        const response = await spotify_api.removeFromMySavedTracks([track.id])

        set_current_track_liked(false)
    }

    // toggles shuffle playback
    async function toggle_shuffle() {
        console.log("Toggle shuffle ><")
        await spotify_api.setShuffle([!props.shuffle])
    }



    return (
        <>
            <div className='row' style={{ 'paddingTop': '2%' }}>

                {/* track art */}
                <div className='col-sm-4 ms-auto' style={{ 'paddingBottom': '10px' }}>
                    <img src={props.current_track.album.images[1].url}
                        className='now-playing__cover' alt='' />
                </div>

                {/* controls */}
                <div className='col-sm-3 ms-auto' >
                    <div style={{ 'textAlign': 'right', 'paddingLeft': '10px' }}>
                        <h2>[ controls ]</h2>

                        {/* playback */}
                        <button className='btn-spotify' style={minimal_style} onClick={() => { props.player.previousTrack() }} >
                            &lt;&lt;
                        </button>
                        <button className='btn-spotify' style={minimal_style} onClick={() => { props.player.togglePlay() }} >
                            {props.is_paused ? 'play' : 'pause'}
                        </button>
                        <button className='btn-spotify' style={minimal_style} onClick={() => { props.player.nextTrack() }} >
                            &gt;&gt;
                        </button>

                        {/* heart */}
                        <div style={{ 'paddingTop': '2%' }}>
                            <a>
                                {(current_track_liked == true)
                                    ? <HiHeart size={24} onClick={() => { remove_track(props.current_track) }} />
                                    : <HiOutlineHeart size={24} onClick={() => { save_track(props.current_track) }} />}
                            </a>
                        </div>

                        {/* shuffle */}
                        <div style={{ 'paddingTop': '5%' }} onClick={() => { toggle_shuffle() }}>
                            <a>
                                {(props.shuffle == true)
                                    ? <MdShuffleOn size={24} />
                                    : <MdShuffle size={24} />}
                            </a>
                        </div>
                    </div>
                </div>

                {/* current playback */}
                <div className='col-md-4 ms-auto' >
                    <div className='now-playing__side' >
                        <h2 style={{ 'paddingBottom': '2px' }}>[ current playback ]</h2>
                        <div className='now-playing__name'>{
                            props.current_track.name
                        }</div>

                        <div className='now-playing__artist' style={{ 'fontWeight': 'bold' }}>{
                            props.current_track.artists[0].name
                        }</div>
                    </div>

                </div>

            </div >
        </>
    )

}

export default Player
