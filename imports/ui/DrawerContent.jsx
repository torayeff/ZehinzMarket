import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

//importing collections
import { Categories } from '../api/categories.js';

//import components
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

class DrawerContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  
  renderCategoryMenu() {
    let categories = this.props.categories;
    return categories.map((category) => {
      return (
        <Link 
          key={category._id}
          to={'/category/' + category.categorySlug}>
          <MenuItem
            onClick={this.props.toggleDrawer}
            primaryText={category.categoryName + ' (' + category.count + ')'}
            rightIcon={<ArrowDropRight />}
          />
        </Link>
      )
    })
  }

  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={this.props.toggleDrawer}
      >
        <AppBar 
          style={{position: 'fixed'}}
          title={
            <span>Menu</span>
          }
          iconElementLeft={
            <IconButton onClick={this.props.toggleDrawer}>
              <NavigationClose/>
            </IconButton>
          }
        />
        <div style={{height: 64}}></div>
        <div>
          <Link to="/">
            <MenuItem
              onClick={this.props.toggleDrawer}
              primaryText="Baş sahypa"
            />
          </Link>

          <Link to="/toptaze">
            <MenuItem
              onClick={this.props.toggleDrawer}
              primaryText="Täze goşulanlar"
              rightIcon={<ArrowDropRight />}
            />
          </Link>

          <Link to="/top10">
            <MenuItem
              onClick={this.props.toggleDrawer}
              primaryText="Top 10"
              rightIcon={<ArrowDropRight />}
            />
          </Link>

          <Divider />
          
          <MenuItem
            onClick={this.props.toggleDrawer}
            primaryText="Bölümler"
          />

          {this.renderCategoryMenu()}
          <br/>
          <Divider />
          <br/>
          <Link to="/about">
            <MenuItem
              onClick={this.props.toggleDrawer}
              primaryText="Maglumat"
              rightIcon={
                <ActionInfoOutline />
              }
            />
          </Link>
        </div>
      </Drawer>
    );
  }
}

DrawerContent.propTypes = {
  categories: PropTypes.array,
  currentUser: PropTypes.object
}

export default createContainer(() => {
  const subs = Meteor.subscribe('categories');
  const categories = Categories.find({count: {$ne: 0}}, {sort: {categoryName: 1}}).fetch();
  
  return {
    categories,
  };
}, DrawerContent);