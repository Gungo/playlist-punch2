import React, { useState, useEffect } from 'react'
import queryString from 'query-string'

function WebPlayback(props) {
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


            player.connect();

        };
    }, []);

    // once the Player object has been successfully created, 
    // we store the object using the userPlayer() hook
    const [player, setPlayer] = useState(undefined);

    return (
        <>
            <div className="container">
                <div className="main-wrapper">

                </div>
            </div>
        </>
    );
}

export default WebPlayback
