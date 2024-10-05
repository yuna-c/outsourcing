import React from 'react';
import Article from '../common/ui/Article';
import Banner from '../common/main/banner/Banner';
import Youtube from '../common/main/youtube/Youtube';
import './../../assets/styles/main.css';
import PharmaciesDisplay from '../common/main/pharmacies/PharmaciesDisplay';

const Main = () => {
  return (
    <Article className="!-mt-2 overflow-x-hidden mx-auto main">
      <Banner />
      <PharmaciesDisplay />
      <Youtube />3
    </Article>
  );
};

export default Main;
