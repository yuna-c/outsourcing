import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import Button from './Button';

import mainIcon from '/src/assets/images/main_icon.png';
import mainDoctor from '/src/assets/images/main_doctor.png';
import mainBanner from '/src/assets/images/main_banner.png';
import './../../../assets/styles/mainPage.css';
import { useState } from 'react';

const Banner = () => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // API를 호출하여 검색 결과 가져오는 로직 추가
  };
  return (
    <div className="main_banner " style={{ backgroundImage: `url(${mainBanner})` }}>
      <img src={mainIcon} alt="banner_icon" />
      <img src={mainDoctor} alt="doctor" className="" />

      <div className="main_text_area ">
        <h3>약국찾기</h3>
        <h3>
          <span>24시 약국</span>을 찾아보세요
        </h3>
        <p className="">약국명과 지역을 선택하여 검색할 수 있습니다.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="약국을 검색해보세요"
            aria-label="검색"
          />
          <Button type="submit">
            <IoMdSearch className="w-7 h-7" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
