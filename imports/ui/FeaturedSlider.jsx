import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';

export default class FeaturedSlider extends Component {
  renderSlides() {
    let slides = this.props.slides;
    
    return slides.map((slide) => {
      return (
        <div className="swiper-slide" key={slide.imgSrc}>
          <img src={slide.imgSrc} alt={slide.text1} />
          <div className="bottom center">
            <a href={slide.link} target="_blank">
              <h4 className="white-text m-0"><strong>{slide.text1}</strong></h4>
              <p className="text-flow white-text m-0">{slide.text2}</p>
            </a>
          </div>
        </div>
      );
    });
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true
    };

    return (
      <Slider {...settings}>
        {this.renderSlides()}
      </Slider>
    );
  }
}

FeaturedSlider.propTypes = {
  slides: PropTypes.array
}
