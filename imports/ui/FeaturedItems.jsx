import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

//import collection
import { Items } from '../api/items.js';
import { Banners } from '../api/banners.js';

//importing components
import FeaturedSlider from './FeaturedSlider.jsx';
import ItemThumb from './ItemThumb.jsx';
import Loading from './Loading.jsx';
import ItemsList from './ItemsList.jsx';

class FeaturedItems extends Component {
  render() {
    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <div>
          
          <FeaturedSlider slides={this.props.slides}/>

          <div className="section center" style={{padding: 0}}>
            <h1 className="heading">Ýörite saýlananlar</h1>
          </div>

          <ItemsList items={this.props.items} />

        </div>
      );
    }
  }
}

FeaturedItems.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  slides: PropTypes.array
}

export default createContainer(() => {
  Meteor.subscribe('banners');
  const slides = Banners.find({hidden: false}, {sort: {createdAt: -1}}).fetch();

  const subs = Meteor.subscribe('featuredItems');
  const loading = !subs.ready();
  const items = 
  Items.find({$and: [{featured: true}, {hidden: false}]}, 
    {sort: {country: 1, lastUpdateCheck: -1}}).fetch();

  return {
    items,
    loading,
    slides
  };

}, FeaturedItems);