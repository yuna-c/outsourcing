import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import Button from './Button';
import mainIcon from '/src/assets/images/main_icon.png';
import './../../../assets/styles/mainPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainBanner from '/src/assets/images/pills.jpg';

const Banner = ({ data }) => {
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
    <div className="main_banner " style={{ backgroundImage: `url(${mainBanner})`, backgroundPosition: 'top left' }}>
      <img src={mainIcon} alt="banner_icon" />

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
