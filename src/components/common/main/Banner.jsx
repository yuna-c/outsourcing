import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import Button from '../ui/Button';
import mainIcon from '/src/assets/images/main_icon.png';
import '../../../assets/styles/mainPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainBanner from '/src/assets/images/pills.jpg';

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
    <div
      className="!h-screen pt-10 bg-left-top bg-cover md:!h-[750px] main_banner saturate-50 bg-custom-deepblue opacity-95"
      style={{ backgroundImage: `linear-gradient(rgba(7, 65, 115, 0.922) , rgba(0, 0, 0, 0.5)), url(${mainBanner})` }}
    >
      <img src={mainIcon} alt="banner_icon" className="grayscale" />

      <div className="flex flex-col w-full xl:w-[55%] lg:w-[85%] gap-2 mt-0 md:px-16 md:py-16 px-5 py:0 md:mt-0 mt-16 border-transparent xl:border-[1.5px] xl:border-[rgba(255,255,255,0.1)] rounded-lg">
        <h3 className="text-[2.8rem] md:text-[3.8rem] leading-tight text-white font-bold md:mb-16 mb-8">
          <span className="bg-cyan-700">언제든,</span>
          <br />
          어디서든 <br />
          <span className="text-cyan-300 text-[3rem] md:text-[4.2rem]">“24시 약국”</span> 찾기
        </h3>

        <p className="pb-2 text-[16px] text-white">
          <span className="font-extrabold text-cyan-300">약국명</span> 과{' '}
          <span className="font-extrabold text-cyan-300">지역</span>을 선택하여 검색할 수 있습니다.
        </p>

        <form onSubmit={handleSubmit} className="relative flex w-[80%]">
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
    </div>
  );
};

export default Banner;
