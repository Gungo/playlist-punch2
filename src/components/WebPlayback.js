import React, { setState, useState, useEffect, } from 'react'
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
    // initial playback settings
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    // grab token from params
    const params = queryString.parse(window.location.search);
    const token = params.access_token;

    // Function to automatically transfer playback to this app
    // via https://mbell.me/blog/2017-12-29-react-spotify-playback-api/
    function transferPlayback(device_id) {
        console.log('Transfering playback.')
        fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "device_ids": [device_id],
                "play": true,
            }),
        });
    }

    // Hook for connecting to spotify
    // via https://developer.spotify.com/documentation/web-playback-sdk/guide/
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Playlist Punch 2.0',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                transferPlayback(device_id);
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
                console.log(state)
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
            {is_active || is_paused
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

                    <img src={current_track.album.images[1].url}
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
