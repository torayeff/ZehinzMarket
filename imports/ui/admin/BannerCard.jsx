import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import SvgIcon from 'material-ui/SvgIcon';
import IconButton from 'material-ui/IconButton';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import { Banners } from '../../api/banners.js';

export default class BannerCard extends Component {
  updateBanner() {
    Meteor.call('banners.update', this.props.banner._id, function(err, res) {
      if (err) {
        console.log(err);
        alert(err);
      } else {
        console.log(res);
        alert(res);
      }
    });
  }

  toggleHidden() {
    Meteor.call('banners.toggleHidden', this.props.banner._id, !this.props.banner.hidden,
      function(err, res) {
        if (err) {
          console.log(err);
          alert(err);
        } else {
          console.log(res);
          alert(res);
        }
    });
  }

  deleteBanner() {
    let yes = confirm('Siz hakykatdanam şuny pozmakçymy?');
    if (yes) {
      Meteor.call('banners.delete', this.props.banner._id, function(err, res) {
        if (err) {
          console.log(err);
          alert(err);
        } else {
          console.log(res);
          alert(res);
        }
      });
    }
  }

  render() {
    return (
      <Card style={{margin: '20px'}}>
        <CardMedia
          overlay={
            <CardTitle 
              title={
                <a href={this.props.banner.link}>{this.props.banner.text1}</a>
              } 
              subtitle={this.props.banner.text2} />
          }
        >
          <img src={this.props.banner.imgSrc} />
        </CardMedia>
        <CardActions>

          <IconButton
            style={{margin: 12, marginTop: 0}}
            onClick={this.updateBanner.bind(this)}
            tooltip="Ýokarlandyr"
          >
            <NavigationArrowUpward />
          </IconButton>
          

          {
            this.props.banner.hidden ?
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
            onClick={this.deleteBanner.bind(this)}
            tooltip="Poz"
          >
            <ActionDelete />
          </IconButton>

        </CardActions>
      </Card>
    );
  }
}

BannerCard.propTypes = {
  banner: PropTypes.object.isRequired
}