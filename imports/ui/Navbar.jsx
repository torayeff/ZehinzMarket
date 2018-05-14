import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'

//import components
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import DrawerContent from './DrawerContent.jsx';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  
  handleSearchClick() {
    browserHistory.push('/search');
  }

  handleTitleClick() {
    browserHistory.push('/');
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <AppBar
          style={{position: 'fixed'}}
          title={
            <span onClick={this.handleTitleClick.bind(this)}>ZEHINZ</span>
          }
          iconElementLeft={
            <IconButton onClick={this.toggleDrawer.bind(this)}>
              <NavigationMenu/>
            </IconButton>
          }
          iconElementRight={
            <IconButton onClick={this.handleSearchClick.bind(this)}>
              <ActionSearch/>
            </IconButton>
          }
        />
        <DrawerContent open={this.state.open} toggleDrawer={this.toggleDrawer.bind(this)}/>
        <div style={{height: 64}}></div>
      </div>
    );
  }
}