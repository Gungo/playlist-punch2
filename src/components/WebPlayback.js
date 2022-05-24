import React, { setState, useState, useEffect, } from 'react'
import Player from './Player.js'
import { transfer_playback } from './Utils.js'
import queryString from 'query-string'

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
    const [is_paused, set_paused] = useState(false);
    const [is_active, set_active] = useState(false);
    const [shuffle, set_shuffle] = useState(false);
    const [current_track, set_track] = useState(track);

    // Hook for connecting to spotify
    // via https://developer.spotify.com/documentation/web-playback-sdk/guide/
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        // grab token from params
        const params = queryString.parse(window.location.search);
        const token = params.access_token;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Playlist Punch 2.0',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            set_player(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                // Automatically transfer playback to this app
                // via https://mbell.me/blog/2017-12-29-react-spotify-playback-api/
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
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                set_track(state.track_window.current_track)
                set_paused(state.paused)
                set_shuffle(state.shuffle)

                player.getCurrentState().then(state => {
                    (!state) ? set_active(false) : set_active(true)
                });

            }));

            player.connect();

        };
    }, []);

    // Once the Player object has been successfully created, 
    // We store the object using the userPlayer() hook
    const [player, set_player] = useState(undefined);

    return (
        <>
            {is_active || is_paused // if in active state or currently paused
                ?

                <Player
                    player={player}
                    is_active={is_active}
                    is_paused={is_paused}
                    shuffle={shuffle}
                    current_track={current_track}
                />
                : <></>
            }
        </>
    );
}

export default WebPlayback
