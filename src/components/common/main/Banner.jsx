import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdSearch } from 'react-icons/io';

import Button from '../ui/Button';
import mainIcon from '/src/assets/images/main_icon.png';

const Banner = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // 검색어 입력 시 해당하는 링크로 이동
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?keyword=${encodeURIComponent(query)}&filter=name`);
    }
  };

  return (
    <div className="!h-screen md:pt-10 pt-[5rem] !mt-2 bg-left-top bg-cover md:!h-[800px] saturate-50 bg-custom-deepblue bg-custom-main-gradient opacity-95 custom-main-gradient relative overflow-hidden bg-no-repeat flex flex-col justify-center items-center">
      <img src={mainIcon} alt="banner_icon" className="grayscale absolute right-5 top-5 w-[150px] md:w-[200px]" />

      <div className="flex flex-wrap-reverse md:flex-nowrap w-full justify-between 2xl:w-[60%] xl:w-[80%] lg:w-[95%] gap-2 mt-0 md:px-8 md:py-16 px-5 py:0 md:mt-0 border-transparent xl:border-[1.5px] lg:border-b-custom-gray">
        <div className="flex flex-col xs:w-full">
          <h3 className="text-[2rem] xs:text-[3.2rem] sm:text-[3.5rem] md:text-[3.8rem] leading-tight text-white font-bold md:mb-24 xs:mb-8 xs:leading-snug mb-4">
            <span className="bg-cyan-700">언제든,</span>
            <br />
            어디서든 <br />
            <span className="text-cyan-300 text-[2.5rem] xs:text-[3.4rem] sm:text-[3.5rem] md:text-[4.2rem] ">
              “24시 약국”
            </span>{' '}
            찾기
          </h3>

          <p className="pb-2 text-[16px] hidden md:block text-white">
            <span className="font-extrabold text-cyan-300">약국명</span> 과{' '}
            <span className="font-extrabold text-cyan-300">지역</span>을 선택하여 검색할 수 있습니다.
          </p>

          <form onSubmit={handleSubmit} className="relative flex w-[100%]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="약국을 검색해보세요"
              aria-label="검색"
              className="w-full h-12 pl-4 border rounded-full border-cyan-300 focus:outline-none"
            />
            <Button
              type="submit"
              className="absolute flex items-center justify-center text-lg border-none rounded-full right-1 top-1 !bg-transparent "
            >
              <IoMdSearch className="w-8 h-8 text-custom-deepblue" />
            </Button>
          </form>
        </div>

        <div className="flex items-center justify-center w-full mb-8 xs:mb-16 video md:w-auto md:mb-0">
          <div className="lg:w-[350px] lg:h-[350px] md:w-[320px] md:h-[320px] sm:w-[310px] sm:h-[310px] xs:w-[260px] xs:h-[260px] w-[200px] h-[200px] overflow-hidden border rounded-full border-transparent ">
            <video
              src="/src/assets/images/video.mp4"
              alt="video"
              className="object-cover h-full"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
