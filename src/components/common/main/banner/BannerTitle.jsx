import React from 'react';

const BannerTitle = () => {
  return (
    <>
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
    </>
  );
};

export default BannerTitle;
