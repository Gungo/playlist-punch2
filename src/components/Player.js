import React, { Component, useState, useEffect } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { MdShuffle, MdShuffleOn } from 'react-icons/md'
import Spotify from 'spotify-web-api-js'

const spotify_api = new Spotify()

const minimal_style = {
    'outline': 'none',
    'border': 'none',
}


function Player(props) {

    const [current_track_liked, setCurrentTrackLiked] = useState('')

    // hook to get current track within likes info
    useEffect(() => {
        async function getData() {
            const response = await spotify_api.containsMySavedTracks([props.current_track.id])

            setCurrentTrackLiked(response)
        }
        getData()

    }, [props.current_track]) // hook occurs whenver current_track changes (i think)

    // adds track to library
    async function save_track(track) {
        console.log("Saving track: ", track)
        const response = await spotify_api.addToMySavedTracks([track.id])

        setCurrentTrackLiked(true)

    }

    // removes track from library
    async function remove_track(track) {
        console.log("Removing track: ", track)
        const response = await spotify_api.removeFromMySavedTracks([track.id])

        setCurrentTrackLiked(false)
    }

    // toggles shuffle playback
    async function toggle_shuffle() {
        await spotify_api.setShuffle([!props.shuffle])
    }

    return (
        <>
            <div className='row' style={{ 'padding': '10px' }}>

                <div className='col-sm' style={{ 'paddingBottom': '10px' }}>
                    <img src={props.current_track.album.images[1].url}
                        className='now-playing__cover' alt='' />
                </div>

                <div className='col-xsm' >

                    <div style={{ 'textAlign': 'right', 'paddingLeft': '10px' }}>

                        <h2>[ controls ]</h2>

                        <button className='btn-spotify' style={minimal_style} onClick={() => { props.player.previousTrack() }} >
                            &lt;&lt;
                        </button>

                        <button className='btn-spotify' style={minimal_style} onClick={() => { props.player.togglePlay() }} >
                            {props.is_paused ? 'play' : 'pause'}
                        </button>

                        <button className='btn-spotify' style={minimal_style} onClick={() => { props.player.nextTrack() }} >
                            &gt;&gt;
                        </button>

                        <div style={{ 'paddingTop': '2%' }}>
                            <a>
                                {
                                    (current_track_liked[0] == true) // need to grab boolean from list
                                        ? <HiHeart size={24} onClick={() => { remove_track(props.current_track) }} />
                                        : <HiOutlineHeart size={24} onClick={() => { save_track(props.current_track) }} />
                                }
                            </a>
                        </div>

                        <div style={{ 'paddingTop': '5%' }} onClick={() => { toggle_shuffle() }}>
                            <a>
                                {console.log("[]", props)}
                                {
                                    (props.shuffle == true)
                                        ? <MdShuffleOn size={24} />
                                        : <MdShuffle size={24} />
                                }
                            </a>
                        </div>

                    </div>

                </div>

                <div className='col-md' >
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
