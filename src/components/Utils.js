/********************
 * Utility Functions
*********************/

// Function to automatically transfer playback to this app
// via https://mbell.me/blog/2017-12-29-react-spotify-playback-api/
export const transferPlayback = (device_id, token) => {
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
