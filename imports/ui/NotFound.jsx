import React, { Component, PropTypes } from 'react';

export default class About extends Component {
  render() {
    return (
      <div style={{
          width: '300px',
          paddingTop: '50px',
          margin: 'auto',
          textAlign: 'center'
        }}
      >
        <h2>Gözleýän sahypaňyz ýok.</h2>
        <h3>Nginx 404</h3>
        <hr/>
        <i style={{fontSize: '10px'}}>nginx/1.4.6 (Solaris)</i>
      </div>
    )
  }
}