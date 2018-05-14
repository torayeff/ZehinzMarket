import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var'

//importing collections
import { Categories } from '../api/categories.js';
import { Items } from '../api/items.js';


//import components
import ItemsList from './ItemsList.jsx';
import Loading from './Loading.jsx';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const INCREMENT = 10;
const LIMIT = 10;
let reactiveLimit = new ReactiveVar(LIMIT);

export default class Category extends Component {
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
      } else if (this.props.items.length >= LIMIT){
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

  render() {
    return (
      <div>
        {
          this.props.category ?
            <div className="section center" style={{padding: 0, paddingTop: 15, margin: 0}}>
              <h1 className="heading">{this.props.category.categoryName}</h1>
            </div> : ''
        }
        <ItemsList items={this.props.items} />
        {this.renderLoadMore()}
      </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object,
  items: PropTypes.array
}

export default createContainer(({params}) => {
  const { categorySlug } = params;

  const limit = parseInt(reactiveLimit.get());
  const itemsHandle = Meteor.subscribe('itemsByCategory', categorySlug, limit);
  const categoryHandle = Meteor.subscribe('categoryInfo', categorySlug); 
  const loading = !itemsHandle.ready();

  const category = Categories.findOne({categorySlug: categorySlug});
  const items = Items.find({category: categorySlug}, 
    {sort: {country: -1, lastUpdateCheck: -1}}).fetch();
  
  return {
    category,
    items,
    loading,
    loadingItems: !itemsHandle.ready()
  };
}, Category);