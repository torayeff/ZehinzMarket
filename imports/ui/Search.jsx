/*
  Can be improved!!!!
*/
import { Session } from 'meteor/session'

import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router'

//import collection
import { Items } from '../api/items.js';

//import Components
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import ItemsList from './ItemsList.jsx';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: null,
      searching: false,
      query: ''
    };
  }

  renderResults() {    
    const {searchResults, searching} = this.state;

    let items = searchResults;

    if (this.state.searching) {
      return (
        <div style={{margin: 'auto', textAlign: 'center'}}>
          <br/>
          <CircularProgress/> 
          <p>Gözlenýär...</p>
        </div>
      );
    } else if (items) {
      return (
        <div>
          <div className="center" style={{padding: 0, marginTop: 30}}>
            <h3 className="heading" style={{padding: 0, margin: 0}}>
              Gözleg netijeleri: {items.length}
            </h3>
          </div>
          <ItemsList items={items}/>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  updateQuery(event) {
    this.setState({
      query: event.target.value
    });
  }

  handleSearch(event) {
    this.setState({searching: true});
    let self = this;

    Meteor.call('items.search', this.state.query, function(err, res){
      self.setState({searching: false});

      if (err) {
        console.log(err);
        alert(err);
      } else {
        self.setState({
          searchResults: res
        })
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            style={{position: 'fixed'}}
            title="Gözleg"
            iconElementLeft={
              <IconButton onClick={browserHistory.goBack}>
                <NavigationClose />
              </IconButton>
            }
          />
          <div style={{height: 64}}></div>
          <div style={{padding: 15, margin: 15, paddingBottom: 0, marginBottom: 0}}>
            <TextField
              style={{marginBottom: -2}}
              floatingLabelText='Programmanyň adyny ýazyň'
              hintText='Programmanyň adyny ýazyň'
              onChange={this.updateQuery.bind(this)}
              fullWidth={true}
            />

            <RaisedButton 
              primary={true}
              label="Gözle" 
              fullWidth={true} 
              style={{marginTop: 10}}
              onClick={this.handleSearch.bind(this)}
            />
          </div>
          {this.renderResults()}
        </div>
      </MuiThemeProvider>
    )
  }
}
