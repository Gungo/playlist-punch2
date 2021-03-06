import React, { Component } from 'react'

class Filter extends Component {
  render () {
    return (
      <div className='main' style={{'margin-top': '2%'}}>
        <div className='form-group has-search'>
          <span className='fa fa-search form-control-feedback'></span>
          <input type='text' className='form-control' placeholder='Search' onKeyUp={event => this.props.onTextChange(event.target.value) }>
          </input>
        </div>
      </div>
    )
  }
}

export default Filter
