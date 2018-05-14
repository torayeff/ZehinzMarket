import React, { Component, PropTypes } from 'react';
import ReactDOMNode from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ReactiveVar } from 'meteor/reactive-var'

//importing collections
import { Items } from '../../api/items.js';

//importing Components
import Navbar from '../Navbar.jsx';
import AccountsUIWrapper from '../users/AccountsUIWrapper.jsx';
import AccountsUIProfile from '../users/AccountsUIProfile.jsx';
import GooglePlayItemSubmitForm from './GooglePlayItemSubmitForm.jsx';
import CustomItemSubmitForm from './CustomItemSubmitForm.jsx';
import FeaturedBanners from './FeaturedBanners.jsx';
import ItemsList from '../ItemsList.jsx';
import NotFound from '../NotFound.jsx';
import AppUpdaterCron from './AppUpdaterCron.jsx';

import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

//set session for reactively re-running createContainer
const INCREMENT = 5;
const LIMIT = 5;
let reactiveLimit = new ReactiveVar(LIMIT);

class Admin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loadMore: true
    }
  }

  loadMore() {
    const itemsCount = this.props.items.length;

    if (itemsCount === reactiveLimit.get()) {
      reactiveLimit.set(reactiveLimit.get() + INCREMENT);
    } else {
      this.setState({
        loadMore: false
      });
    }
  }

  renderLoadMore() {
    if (this.state.loadMore) {
      if (this.props.loadingItems) {
        return (
          <div style={{
              width: '250px', 
              margin: 'auto', 
              paddingTop: '50px',
              textAlign: 'center'
            }}
          >
            <CircularProgress />
          </div>
        );
      } else {
        return (
          <div style={{padding: 15, margin: 15}}>
            <RaisedButton
              onClick={this.loadMore.bind(this)}
              primary={true}
              label="Ýenede görkez"  
              fullWidth={true}
              onClick={this.loadMore.bind(this)}
            /> 
          </div>
        );
      }
    } else {
      return (
        <div></div>
      );
    }
  }

  renderDashboard() {
    return (
        <Tabs initialSelectedIndex={1}>

          <Tab label="Applar">
            <div className="zcenter">
              <ItemsList items={this.props.items}/>
              {this.renderLoadMore()}
            </div>
          </Tab>

          <Tab label="Täze app">
            <div className="zcenter">
              <GooglePlayItemSubmitForm />
              <hr/>
              <CustomItemSubmitForm />
            </div>
          </Tab>

          <Tab label="Mahabat">
            <div className="zcenter">
              <FeaturedBanners />
            </div>
          </Tab>

          <Tab label="MEN">
            <div className="zcenter">
              <AccountsUIProfile />
            </div>
          </Tab>

        </Tabs>
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Navbar />
          {
            !this.props.currentUser ? <AccountsUIWrapper /> 
              : ''
          }

          {
            this.props.isSuperAdmin  ? 
            this.renderDashboard() : <NotFound />
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

Admin.propTypes = {
  currentUser: PropTypes.object,
  items: PropTypes.array.isRequired,
  isSuperAdmin: PropTypes.bool
};

export default createContainer(({params}) => {
  const currentUser = Meteor.user();
  const isSuperAdmin = currentUser && currentUser.roles &&
    currentUser.roles.__global_roles__[0] === 'superAdmin';

  const limit = parseInt(reactiveLimit.get());
  const itemsHandle = Meteor.subscribe('itemsForAdmin', limit);
  const items = Items.find({}, {sort: {lastUpdateCheck: -1}}).fetch();
  
  return {
    items,
    isSuperAdmin: isSuperAdmin,
    currentUser,
    loadingItems: !itemsHandle.ready()
  };
}, Admin);