import React, { Component } from 'react'


const sign_in_style = {
    'textAlign': 'center',
    'float': 'right',
    'outline': 'none !important',
    'box-shadow': 'none',
}

class GungoDevButton extends Component {
    render() {
        this.state = {
            dark_mode: true
        }
        return (
            <div style={sign_in_style}>
                <a href='https://gungo.dev' className='btn btn-outline' style={sign_in_style} >
                    <p style={{ 'fontWeight': 'bold' }}>[ home | gungo.dev ]</p>
                </a>
            </div>
        )
    }
}

export default GungoDevButton
