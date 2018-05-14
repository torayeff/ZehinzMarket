import React, { Component, PropTypes } from 'react';
import ReactDOMNode from 'react-dom';
import { Meteor } from 'meteor/meteor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//importing Components
import Navbar from './Navbar.jsx';

export default class App extends Component {
  componentDidMount() {
    analytics.page('App Component');
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}