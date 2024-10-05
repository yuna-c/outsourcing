import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { IoMdSearch } from 'react-icons/io';

const BannerSearch = () => {
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
    <form onSubmit={handleSubmit} className="relative flex w-[100%]">
      <Input
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
  );
};

export default BannerSearch;
