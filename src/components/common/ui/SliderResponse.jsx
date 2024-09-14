import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './../../../../test.css';

function SliderResponse() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>약국이름1</h3>
        </div>
        <div>
          <h3>약국이름2</h3>
        </div>
        <div>
          <h3>약국이름3</h3>
        </div>
        <div>
          <h3>약국이름4</h3>
        </div>
        <div>
          <h3>약국이름5</h3>
        </div>
        <div>
          <h3>약국이름6</h3>
        </div>
        <div>
          <h3>약국이름7</h3>
        </div>
        <div>
          <h3>약국이름8</h3>
        </div>
      </Slider>
    </div>
  );
}

export default SliderResponse;
