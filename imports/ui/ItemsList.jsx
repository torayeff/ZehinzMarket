import React, { Component, PropTypes } from 'react';

//import components
import List from 'material-ui/List';
import ItemThumb from './ItemThumb.jsx';
import ItemActions from './admin/ItemActions.jsx'

export default class ItemsList extends Component {
  render() {
    let items = this.props.items;
    return (
      <List>
      {
        items.map((item) => {
          return (
            <div key={item._id}>
              <ItemThumb 
                item={item}
                key={item._id}
              />
            </div>
          ); 
        })
      }
      </List>
    )
  }
}

ItemsList.propTypes = {
  items: PropTypes.array
}