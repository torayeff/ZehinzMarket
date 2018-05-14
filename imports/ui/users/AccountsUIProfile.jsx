import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import RaisedButton from 'material-ui/RaisedButton';

export default class AccountsUIProfile extends Component {
  componentDidMount() {
    this.view = Blaze.renderWithData(
      Template.atForm, 
      {state: 'changePwd'},
      ReactDOM.findDOMNode(this.refs.container)
    );
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  logOut() {
    Meteor.logout();
  }
  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div style={{margin: 'auto', width: '350px', 
          textAlign: 'center', paddingTop: '15px'}}>
        <span ref="container" />
        <hr/>
        <RaisedButton 
          secondary={true}
          label="Çykmak" 
          fullWidth={true} 
          style={{marginTop: 10}}
          onClick={this.logOut.bind(this)}
        />
      </div>
    );
  }
}