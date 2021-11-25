import React, { Component, useState, useEffect } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import Spotify from 'spotify-web-api-js'

const spotify_api = new Spotify()

const minimal_style = {
    'outline': 'none',
    'border': 'none',
}


function Player(props) {

    const [current_track_liked, setCurrentTrackLiked] = useState('')

    useEffect(() => {
        async function getData() {
            const response = await spotify_api.containsMySavedTracks([props.current_track.id])
            console.log('res: ', response)
            setCurrentTrackLiked(response)
        }
        getData()

    }, [props.current_track])



    return (
        <>
            <div className='row' style={{ 'paddingTop': '20px' }}>

                <div className='col-sm' style={{ 'paddingBottom': '10px' }}>
                    <img src={props.current_track.album.images[1].url}
                        className='now-playing__cover' alt='' />
                </div>

                <div className='col-sm' >

                    <div className='now-playing__side' style={{ 'textAlign': 'right' }}>
                        <h2>[ current playback ]</h2>
                        <div className='now-playing__name'>{
                            props.current_track.name
                        }</div>

                        <div className='now-playing__artist' style={{ 'fontWeight': 'bold' }}>{
                            props.current_track.artists[0].name
                        }</div>
                    </div>
                </div>

                <div className='col-md' >
                    <div>
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

                        <div className='row-sm'>
                            <a style={{ 'paddingLeft': '5px' }}>
                                {console.log('curr: ', current_track_liked)}
                                {
                                    (current_track_liked[0] == true) // need to grab boolean from list
                                        ? <HiHeart size={24} />
                                        : <HiOutlineHeart size={24} />
                                }

                            </a>

                        </div>


                    </div>
                </div>

            </div>
        </>
    )

}

export default Player
