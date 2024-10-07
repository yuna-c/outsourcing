import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdArrowForwardIos } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import { ONE_SECOND } from '../../../../core/constants';
import Button from '../../ui/Button';

function SliderResponse({ pharmacies = [], tag }) {
  const navigate = useNavigate();

  // 슬라이더 설정
  const settings = {
    dots: false,
    infinite: pharmacies.length > 1, // 약국 수가 2개 이상일 때 무한 스크롤 활성화
    autoplay: true,
    autoplaySpeed: 3 * ONE_SECOND,
    speed: 500,
    slidesToShow: Math.min(pharmacies.length, 3), // 최대 3개, 아이템 수에 따라 조정
    slidesToScroll: Math.min(pharmacies.length, 3), // 최대 3개, 아이템 수에 따라 조정
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(pharmacies.length, 2),
          slidesToScroll: Math.min(pharmacies.length, 2),
          infinite: pharmacies.length > 1, // 약국 수가 2개 이상일 때 무한 스크롤 활성화
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(pharmacies.length, 1),
          slidesToScroll: Math.min(pharmacies.length, 1),
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

  // 약국 자세히 보기 버튼 클릭 시 해당 약국 ID를 사용하여 상세 페이지로 이동
  const handleDetailClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="slider_container text-center box-border max-w-[1100px] mx-auto md:pb-[60px]">
      {pharmacies.length > 0 ? ( // 아이템이 있을 때만 슬라이더 렌더링
        <Slider {...settings} className="pt-2 md:pt-5">
          {pharmacies.map((item) => (
            <div
              key={item.name}
              className="border border-custom-gray shadow-md bg-white h-[300px] relative rounded-[15px] slider_item w-full"
            >
              <span className="slider_item_tag bg-custom-skyblue text-white py-[5px] px-[10px] rounded-[10px] right-[20px] top-[20px] absolute text-sm font-bold">
                {tag}
              </span>

              <div
                className="slider_text_area top-[80px] mx-auto left-[50%] translate-x-[-50%] w-[80%] leading-[40px] absolute overflow-hidden
  whitespace-nowrap text-ellipsis"
              >
                <h3 className="text-[23px] font-extrabold">{item.name}</h3>
                <p className="highlight bg-[#C3EBFF] py-1 px-2 rounded-[8px] font-bold text-sm inline-block overflow-hidden whitespace-nowrap text-ellipsis max-w-[80%]">
                  {item.time}
                </p>
                <p className="address block-text text-[14px] leading-[15px]">{item.address}</p>
              </div>

              <Button
                className="inline-flex items-center justify-center absolute bottom-[47px] translate-x-[-50%] py-[5px] px-[14px] min-w-[151px] w-[85%] xl:w-auto"
                onClick={() => handleDetailClick(item.id)}
              >
                약국 자세히 보기 <MdArrowForwardIos />
              </Button>
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
