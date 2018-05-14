import React, { Component, PropTypes } from 'react';

import ToggleStar from 'material-ui/svg-icons/toggle/star';

export default class StarRating extends Component {
  renderStars() {
    let ratedNum = Math.round(this.props.score);
    let stars = []

    for (let i = 1; i<=5; i++) {
      let color = '#E0E0E0';

      if ( i<= ratedNum ) {
        color = '#FDD835';
      }

      stars.push(
        <ToggleStar 
          key={i} 
          style={{color: color, width: 12, height: 12}}
        />
      )
    }

    if (ratedNum > 0) {
      stars.push(
        <span key={6} style={{fontSize: 13, color: 'grey'}}>
          ({this.props.score})
        </span>
      )
    }

    return stars;
  }

  render() {
    return (
        <span>
          {this.renderStars()}
        </span>
    );
  }
}

StarRating.propTypes = {
  score: PropTypes.number
}