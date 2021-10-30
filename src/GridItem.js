import React, { Component } from 'react'
import FluidGrid from '@allpro/react-fluid-grid'
import Playlist from './Playlist.js'

let unclicked_style = {
    item: true,
    flexBasis: '130px',
    minWidth: '33%',
    maxWidth: '75%',
    'margin-left': 'auto',
    'margin-right': 'auto'
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
