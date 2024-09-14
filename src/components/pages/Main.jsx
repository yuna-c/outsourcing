import { useState } from 'react';
import Article from '../common/ui/Article';

import SliderResponse from '../common/ui/SliderResponse';
import Banner from '../common/ui/Banner';
const Main = () => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // API를 호출하여 검색 결과 가져오는 로직 추가
  };

  return (
    <Article className="main mx-auto border border-red-500">
      {/* 배너 부분 */}
      <Banner value={(handleSubmit, query, setQuery)} />
      {/* 아래 섹션 */}
      <div className="flex justify-center">
        <h3>지금 영업중인 약국</h3>
      </div>
      <SliderResponse />
    </Article>
  );
};

export default Main;
