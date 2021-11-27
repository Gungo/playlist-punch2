/********************
 * Utility Functions
*********************/

// Function to automatically transfer playback to this app
// via https://mbell.me/blog/2017-12-29-react-spotify-playback-api/
export const transfer_playback = (device_id, token) => {
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

// Randomizes array (self explanatory)
// via codegrepper.com/code-examples/javascript/return+a+list+in+random+order+javascript
export function random_array_shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
