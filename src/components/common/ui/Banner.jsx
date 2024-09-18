import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import Button from './Button';

const Banner = ({ handleSubmit, query, setQuery }) => {
  return (
    <div className="main_banner relative overflow-hidden border rounded-lg bg-[url('/public/main_banner.png')] h-[400px] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center">
      <img
        src="/public/main_icon.png"
        alt="banner_icon"
        className="icon absolute left-5 top-5 w-[150px] md:w-[200px]"
      />
      <img
        src="/public/main_doctor.png"
        alt="doctor"
        className="doctor absolute right-0 z-10 bottom-[-30px] opacity-90 w-[100px] md:w-[150px]"
      />

      <div className="main_text_area flex flex-col items-center z-20 w-full max-w-[400px] gap-2">
        <h3 className="text-white text-[27px] font-bold">약국찾기</h3>
        <h3 className="text-lg text-white">
          <span className="text-[#9bdba6]">24시 약국</span>을 찾아보세요
        </h3>
        <p className="pb-2 text-sm text-center text-white">약국명과 지역을 선택하여 검색할 수 있습니다.</p>
        <form onSubmit={handleSubmit} className="flex justify-center w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="약국을 검색해보세요"
            aria-label="검색"
            className="rounded-md pl-4 w-[80%] h-10 border-2 border-custom-green focus:outline-none"
          />
          <Button
            type="submit"
            className="flex items-center justify-center w-10 h-10 border-none rounded-md bg-custom-green"
          >
            <IoMdSearch className="w-7 h-7" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
