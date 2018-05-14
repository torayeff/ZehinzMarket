import React, { Component } from 'react';

import CircularProgress from 'material-ui/CircularProgress';


export default class Loading extends Component {
  render() {
    return (
      <div className="section center" style={{paddingTop: 150}}>
        <CircularProgress size={1.5} />
      </div>
    );
  }
}