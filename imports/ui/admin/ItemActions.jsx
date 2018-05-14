import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';

//import components
import IconButton from 'material-ui/IconButton';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ActionUpdate from 'material-ui/svg-icons/action/update';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CircularProgress from 'material-ui/CircularProgress';

class ItemActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionProgress: false
    }
  }

  updateItem() {
    
    this.setState({
      actionProgress: true
    });

    let self = this;

    let updateMethod = this.props.item.customApp ? 'customItems.update' :
      'items.updateInServerFromGooglePlay';

    Meteor.call(updateMethod, 
      this.props.item._id, function(err, res) {
      if (err) {
        
        self.setState({
          actionProgress: false
        });

        alert(err);
        console.log(err);
      } else {

        self.setState({
          actionProgress: false
        });

        alert(res);
        console.log(res);
      }
    });
  }

  toggleFeatured() {
    Meteor.call('items.toggleFeatured', this.props.item._id, !this.props.item.featured);
  }

  toggleHidden() {
    Meteor.call('items.toggleHidden', this.props.item._id, !this.props.item.hidden);
  }

  deleteThisItem() {
    let yes = confirm('Siz hakykatdanam şuny pozmakçymy?');
    if (yes) {
      Meteor.call('items.delete', this.props.item._id, this.props.item.appId);
    }
  }

  render() {
    let item = this.props.item;
    if (this.props.isSuperAdmin) {
      return (
        this.state.actionProgress ?
          <div style={{margin: 'auto', textAlign: 'center'}}>
            <CircularProgress/> 
          </div>
            :
        <div 
          style={{
              fontSize: 18, 
              margin: 'auto'
            }}
        >

          <IconButton 
            style={{margin: 12, marginTop: 0}}
            onClick={this.toggleFeatured.bind(this)}
            tooltip={
              item.featured ? 'Ýöriteleşdirmeden aýyr' : 'Ýöriteleşdir'
            } 
            iconStyle={
              item.featured ? {color: '#FDD835'} : {}
            }>
            <ToggleStar/>
          </IconButton>

          <IconButton 
            style={{margin: 12, marginTop: 0}}
            onClick={this.updateItem.bind(this)}
            tooltip='Täzele'
          >
            <ActionUpdate/>
          </IconButton>

          {
            item.hidden ?
            <IconButton
              style={{margin: 12, marginTop: 0}}
              onClick={this.toggleHidden.bind(this)}
              tooltip="Görkez"
            >
              <ActionVisibilityOff/>
            </IconButton>
            :
            <IconButton
              style={{margin: 12, marginTop: 0}}
              onClick={this.toggleHidden.bind(this)}
              tooltip="Gizle"
            >
              <ActionVisibility/>
            </IconButton>
          }

          <IconButton
            style={{margin: 12, marginTop: 0}}
            onClick={this.deleteThisItem.bind(this)}
            tooltip="Poz"
          >
            <ActionDelete />
          </IconButton>

          <div style={{textAlign: 'right', margin: 0, padding: 0, marginTop: -20}}>
            <small
              style={
                moment().diff(this.props.item.lastUpdateCheck, 'days') >= 7 
                  ? {color: 'red'}
                  : {}
              }
            >
              <i style={{fontSize: 10}}>
                Soňky barlanan wagty: 
                {moment(this.props.item.lastUpdateCheck).format('HH:mm:ss DD/MM/YY')}
              </i>
            </small>
          </div>
          <hr style={{margin: 15, marginTop: 0, marginBottom: 10}}/>
        </div>
      );
    } else {
      return (
        <span></span>
      );
    }
  }
}

ItemActions.propTypes = {
  item: PropTypes.object.isRequired,
}

export default createContainer(({params}) => {
  const currentUser = Meteor.user();
  const isSuperAdmin = currentUser && currentUser.roles &&
    currentUser.roles.__global_roles__[0] === 'superAdmin';

  return {
    isSuperAdmin,
  };

}, ItemActions);