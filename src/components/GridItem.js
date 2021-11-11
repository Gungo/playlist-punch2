import React, { Component } from 'react'
import FluidGrid from '@allpro/react-fluid-grid'
import Playlist from './Playlist.js'

let unclicked_style = {
    item: true,
    // trial error for iphone to show 1 playlist
    flexBasis: '390px',
    minWidth: '33%',
    maxWidth: '100%',
    'marginLeft': 'auto',
    'marginRight': 'auto'
    //margin: 'auto' //comment this for neat align
}


class GridItem extends Component {
    render() {
        let playlist = this.props.playlist
        return (
            <FluidGrid style={unclicked_style}>
                <Playlist playlist={playlist} />
            </FluidGrid>
        )
    }
}

export default GridItem
