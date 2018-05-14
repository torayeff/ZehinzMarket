import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

//import collection
import { Items } from '../api/items.js';

//import components
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SvgIcon from 'material-ui/SvgIcon';
import GetApp from 'material-ui/svg-icons/action/get-app';
import ItemImgSwiper from './ItemImgSwiper.jsx';
import Loading from './Loading.jsx';
import StarRating from './StarRating.jsx';

import ItemActions from './admin/ItemActions.jsx';

class Item extends Component {
  downloadApp() {
    Meteor.call('items.incrementDownloads', this.props.item._id, function(err, res){});
    window.open(this.props.item.downloadUrl, '_system');
  }

  openGooglePlay() {
    window.open(this.props.item.url, '_system');
  }

  render() {
    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      let item = this.props.item;
      return (
        <div>
          <div className="hero-header animated fadein">
            
            <ItemImgSwiper imgSrcs={item.screenshots}/>

            <div style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px'
            }}>
              <FloatingActionButton secondary={true} onClick={this.downloadApp.bind(this)}>
                <GetApp />
              </FloatingActionButton>
            </div>
          </div>

          <div className="center-align p-20">
            <h3 className="m-0"><strong>{item.title}</strong></h3>
            <StarRating score={item.score}/>
            <h4>
              <a href={item.url}>{item.developer}</a>
              <br/>
              <span className="small grey-text">
                <Link to={'/category/' + item.category}>
                  {item.categoryName}
                </Link>
              </span>
            </h4>
          </div>

          <div className="product-description">

            <div className="p-20">
              <h4>Maglumat</h4>
              <p className="text-flow" style={{textAlign: 'justify'}}>
                {item.description}
              </p>
              
              <div className="product half">
                <p>
                  <strong>Android wersiýa</strong>
                  <br/>
                  <span>{item.androidVersion}</span>
                </p>

                <p>
                  <strong>Göwrümi</strong>
                  <br/>
                  <a href="#">{item.size}</a>
                </p>

                <p>
                  <strong>Google Play</strong>
                  <br/>
                  <a
                    onClick={this.openGooglePlay.bind(this)}
                    href="#"
                    className="play-store-link" 
                    style={{color: '#00BCD4'}}>
                    {item.title}
                  </a>
                </p>
              </div>

              <div className="product half">
                <p>
                  <strong>Täzelenen wagty</strong>
                  <br/>
                  <span>{item.updated}</span>
                </p>

                <p>
                  <strong>Alynan sany</strong>
                  <br/>
                  <span>{item.minInstalls} - {item.maxInstalls}</span>
                </p>

                { Meteor.user() ?
                  <p>
                    <strong>zMarket sany</strong>
                    <br/>
                    <span>{item.zDownloadsCount || 0}</span>
                  </p> : ''
                }
              </div>

              <div className="clr"></div>

              <ItemActions item={item}/>
              
            </div>

          </div>

        </div>
      );
    }
  }
}

Item.propTypes = {
  item: PropTypes.object,
  loading: PropTypes.bool,
}

export default createContainer(({params}) => {

  const subs = Meteor.subscribe('itemInfo', params.appId);
  const loading = !subs.ready();
  const item = Items.findOne({appId: params.appId});

  return {
    item, 
    loading,
  };

}, Item);