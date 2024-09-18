import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Button from './Button';

function SliderResponse({ pharmacies = [], tag }) {
  // 슬라이더 설정
  const settings = {
    dots: false,
    infinite: pharmacies.length > 1, // 약국 수가 2개 이상일 때 무한 스크롤 활성화
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: Math.min(pharmacies.length, 3), // 최대 4개, 아이템 수에 따라 조정
    slidesToScroll: Math.min(pharmacies.length, 3), // 최대 4개, 아이템 수에 따라 조정
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(pharmacies.length, 3),
          slidesToScroll: Math.min(pharmacies.length, 3),
          infinite: pharmacies.length > 1, // 약국 수가 2개 이상일 때 무한 스크롤 활성화
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(pharmacies.length, 2),
          slidesToScroll: Math.min(pharmacies.length, 2),
          infinite: pharmacies.length > 1, // 약국 수가 2개 이상일 때 무한 스크롤 활성화
          initialSlide: 1 // 필요에 따라 초기 슬라이드 설정
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
    <div className="slider_container">
      {pharmacies.length > 0 ? ( // 아이템이 있을 때만 슬라이더 렌더링
        <Slider {...settings} className="pt-5">
          {pharmacies.map((item) => (
            <div key={item.name} className="slider_item">
              <span className="slider_item_tag">{tag}</span>
              <div className=" slider_text_area">
                <h3>{item.name}</h3>
                <p className="highlight">{item.time}</p>
                <p className="address block-text">{item.address}</p>
              </div>
              <Button>약국 자세히 보기 &gt;&gt;</Button>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center leading-[350px]">현재 영업 중인 약국이 없습니다.</p> // 슬라이더가 없을 경우 메시지 표시
      )}
    </div>
  );
}

export default SliderResponse;
