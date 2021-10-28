import React, { Component } from 'react'
import SignInButton from './SignInButton.js'
import Header from './Header.js'
import Filter from './Filter.js'
import FluidGrid from '@allpro/react-fluid-grid'
import GridItem from './GridItem.js'
import Spotify from 'spotify-web-api-js'
import queryString from 'query-string'
import './App.css'

const spotify_api = new Spotify();

class App extends Component {
  constructor() {
    super()
    const params = queryString.parse(window.location.search)
    const token = params.access_token
    if (token) {
      spotify_api.setAccessToken(token)
    }
    this.state = {
      filter_string: '',
    }
  }

  getUser() {
    spotify_api.getMe()
      .then(data => this.setState({
        user: { name: data.display_name }
      }))
  }

  setData() {
    spotify_api.getUserPlaylists()
      .then(playlists_data => {
        let playlists = playlists_data.items
        let track_promises = playlists.map(playlist => {
          return spotify_api.getPlaylistTracks(playlist.id)
        })
        let all_track_promises =
          Promise.all(track_promises)
        let playlists_promise = all_track_promises.then(track_datas => {
          track_datas.forEach((track_data, i) => {
            let track_data_array = Array.from(track_data.items
              .map(item => item.track))
              .map(track_data => ({
                name: track_data.name,
                artist: track_data.artists[0].name,
                duration_ms: track_data.duration_ms,
                id: track_data.id
              }))
            playlists[i].track_datas = track_data_array
          })
          return playlists
        })
        return playlists_promise
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          console.log(item)
          return {
            name: item.name,
            image: item.images.length > 0 ? item.images[0].url : [],
            description: item.description.length > 0 ? item.description : [],
            tracks: item.track_datas
          }
        })
      }))
  }

  componentDidMount() {
    this.getUser()
    this.setData()
  }

  render() {
    let playlists_to_render =
      this.state.user &&
        this.state.playlists
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filter_string.toLowerCase()))
        : []

    return (
      <div id="app" className="App">
        {this.state.user
          ?
          <div>
            <Header playlists={playlists_to_render} data={this.state} />

            <Filter onTextChange={text => {
              this.setState({ filter_string: text })
            }} />

            <script src="https://sdk.scdn.co/spotify-player.js"></script>
            <script>
              window.onSpotifyWebPlaybackSDKReady = {() => {
                const params = queryString.parse(window.location.search)
                const token = params.access_token
                const webPlayback = new Spotify.Player({
                  name: "Spotify Web Playback SDK",
                  getOAuthToken: callback => { callback(token) }
                })
                webPlayback.connect();
              }
              }
            </script>

            <FluidGrid style={{ 'text-align': 'center' }} container>
              {playlists_to_render.map(playlist =>
                <GridItem playlist={playlist} />
              )}
            </FluidGrid>

          </div>
          : <SignInButton />
        }
      </div>
    )
  }
}

export default App
