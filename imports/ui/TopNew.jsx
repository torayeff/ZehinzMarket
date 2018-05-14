import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

//import collection
import { Items } from '../api/items.js';
import { Banners } from '../api/banners.js';

//importing components
import ItemThumb from './ItemThumb.jsx';
import Loading from './Loading.jsx';
import ItemsList from './ItemsList.jsx';

class TopNew extends Component {
  render() {
    if (this.props.loading) {
      return (
        <Loading />
      );
    } else {
      return (
        <div>

          <div className="section center" style={{padding: 0, paddingTop: 15, margin: 0}}>
            <h1 className="heading">Täze goşulanlar</h1>
          </div>
          {
            this.props.loading ? <Loading/> : <ItemsList items={this.props.items} />
          }

        </div>
      );
    }
  }
}

TopNew.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool
}

export default createContainer(() => {

  const subs = Meteor.subscribe('topNew');
  const loading = !subs.ready();
  const items = 
  Items.find({}, {sort: {lastUpdateCheck: -1}}).fetch();

  return {
    items,
    loading
  };

}, TopNew);