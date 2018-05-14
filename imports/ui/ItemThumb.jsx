import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

//importing components
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import ContentSave from 'material-ui/svg-icons/content/save';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';

import StarRating from './StarRating.jsx';

export default class ItemThumb extends Component {
  render() {
    let item = this.props.item;
    return (
      <Link to={'/item/' + item.appId} key={item._id}>
        <ListItem
          key={item._id}
          leftAvatar={<Avatar src={item.icon} size={70}/>}
          primaryText={
            <div style={{paddingLeft: 25, fontSize: 18, fontWeight: 301}}>
              {item.title}&nbsp;
              {item.size ? 
                <span style={{fontSize: 12, color: '#595959'}}>
                  (<ContentSave style={{width: 12, height: 12, 
                    padding:0, marginBottom: -2, color: '#595959'}}/>
                    &nbsp;{item.size})
                </span> : ''
              }
              {
                Meteor.user() ? 
                <span style={{fontSize: 12, color: '#595959'}}>
                  &nbsp;(<FileCloudDownload style={{width: 12, height: 12, 
                    padding:0, marginBottom: -2, color: '#595959'}}/>
                    &nbsp;{item.zDownloadsCount || 0})
                </span> : ''
              }
            </div>
          }
          secondaryText={
            <p style={{paddingLeft: 25, paddingBottom: 50, }}>
              <StarRating score={item.score} style={{paddingTop: 30}}/>
              <br/>
              <span style={{color: 'black', fontWeight: 200}}>
                {item.developer} 
              </span>
              <br/>
              {item.summary}
            </p>
          }
        />
      </Link>
    );
  }
}

ItemThumb.propTypes = {
  item: PropTypes.object
}