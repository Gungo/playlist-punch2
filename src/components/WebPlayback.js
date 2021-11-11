import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { FiPlayCircle, FiPauseCircle, FiRepeat, } from 'react-icons/fi'

const minimal_style = {
    'outline': 'none',
    'border': 'none',
    'paddingBottom': '1%',
}

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);

    // for connecting to spotify
    // via https://developer.spotify.com/documentation/web-playback-sdk/guide/
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const params = queryString.parse(window.location.search);
            const token = params.access_token;

            const player = new window.Spotify.Player({
                // @TODO fix token 
                name: 'Playlist Punch SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });

            }));

            player.connect();

        };
    }, []);

    // once the Player object has been successfully created, 
    // we store the object using the userPlayer() hook
    const [player, setPlayer] = useState(undefined);

    return (
        <>
            {is_active
                ?
                <div style={{ 'paddingTop': '1%' }}>

                    <div>
                        <button className="btn-spotify" style={minimal_style} onClick={() => { player.previousTrack() }} >
                            &lt;&lt;
                        </button>

                        <button className="btn-spotify" style={minimal_style} onClick={() => { player.togglePlay() }} >
                            {is_paused ? "play" : "pause"}
                        </button>

                        <button className="btn-spotify" style={minimal_style} onClick={() => { player.nextTrack() }} >
                            &gt;&gt;
                        </button>
                    </div>

                    <img src={current_track.album.images[0].url}
                        className="now-playing__cover" alt="" />

                    <div className="">
                        <div className="now-playing__side">
                            <div className="now-playing__name">{
                                current_track.name
                            }</div>

                            <div className="now-playing__artist">{
                                current_track.artists[0].name
                            }</div>
                        </div>
                    </div>

                </div>
                : <></>
            }

        </>
    );
}

export default WebPlayback
