import React, { Component } from 'react'
import Header from './components/Header.js'
import Filter from './components/Filter.js'
import GridItem from './components/GridItem.js'
import SignInButton from './components/SignInButton.js'
import WebPlayback from './components/WebPlayback.js'
import { random_array_shuffle } from './components/Utils.js'
import queryString from 'query-string'
import FluidGrid from '@allpro/react-fluid-grid'
import Spotify from 'spotify-web-api-js'
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
      token: token
    }

  }

  getUser() {
    spotify_api.getMe()
      .then(data => this.setState({
        user: { name: data.display_name }
      }))
  }

  setData() {
    spotify_api.getUserPlaylists({ limit: 25 }) // change playlist limit
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
                // make sure they're not empty
                name: (track_data) ? track_data.name : '',
                artist: (track_data) ? track_data.artists[0].name : '',
                duration_ms: (track_data) ? track_data.duration_ms : '',
                id: (track_data) ? track_data.id : '',
                uri: (track_data) ? track_data.uri : '',
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
            name: (item) ? item.name : '',
            owner: (item) ? item.owner : {},
            image: (item.images.length > 0) ? item.images[0].url : [],
            description: (item.description.length > 0) ? item.description : [],
            tracks: (item) ? item.track_datas : [],
            uri: (item) ? item.uri : '',
            id: (item) ? item.id : '',
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
    // randomize playlists on render for variety
    playlists_to_render = random_array_shuffle(playlists_to_render)

    return (
      <>

        <div id="app" className="App">
          {this.state.user
            ?
            <div>
              <Header playlists={playlists_to_render} data={this.state} />
              <WebPlayback />

              <Filter onTextChange={text => {
                this.setState({ filter_string: text })
              }} />

              <FluidGrid style={{ 'textAlign': 'center' }} container>
                {playlists_to_render.map(playlist =>
                  <GridItem playlist={playlist} />
                )}
              </FluidGrid>

            </div>
            :
            <SignInButton />

          }
        </div>

      </>
    )
  }
}

export default App
