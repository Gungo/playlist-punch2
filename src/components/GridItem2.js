import React, { Component } from 'react'
import FluidGrid from '@allpro/react-fluid-grid'
import Playlist from './Playlist.js'

let unclicked_style = {
  item: true,
  flexBasis: '130px',
  minWidth: '33%',
  maxWidth: '75%',
  margin: 'auto'
}

let clicked_style = {
  item: true,
  flexBasis: '1300px',
  minWidth: '50%',
  maxWidth: '75%',
  margin: 'auto'
}

class GridItem extends Component {
  changeItemClick() {
    this.state.item_clicked = !this.state.item_clicked
  }
  forceUpdate() {
    window.location.reload()
  }

  render() {
    this.state = {
      item_clicked: false
    }
    let playlist = this.props.playlist
    let curr_style = this.state.item_clicked ? unclicked_style : unclicked_style
    return (

      <FluidGrid style={curr_style} onClick={(event) => {
        this.changeItemClick()
        event.target.style = curr_style
        //this.forceUpdate()
        console.log(this.state.item_clicked)
        console.log(curr_style)


      }
      }>
        <Playlist playlist={playlist} />
      </FluidGrid>
    )
  }
}

export default GridItem
