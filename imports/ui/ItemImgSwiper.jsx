import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';

export default class ItemImgSwiper extends Component {
  renderImages() {
    let srcs = this.props.imgSrcs;
    
    return srcs.map((src) => {
      return (
        <div key={src}>
          <img src={src}/>
        </div>
      );
    });
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      lazyLoad: true
    };

    return (
      <Slider {...settings}>
        {this.renderImages()}
      </Slider>
    );
  }
}

ItemImgSwiper.propTypes = {
  imgSrcs: PropTypes.array
}
