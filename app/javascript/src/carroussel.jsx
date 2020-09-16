import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './carroussel.scss';

export default class SimpleSlider extends Component {

  render () {
      const { images } = this.props;

      const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

      return (
        <div style={{padding: 20}}>
          <Slider {...settings}>
          {images.map((image) => {
            return(
              <div key={image.image_url}>
                <div className="property-image" style={{ backgroundImage: `url(${image.image_url})`}}/>
              </div>
            );
          })}

          </Slider>
        </div>
      );
    }
  }
