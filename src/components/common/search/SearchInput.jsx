import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({
  searchParams,
  setSearchParams,
  isSearchVisible,
  searchType,
  keyword,
  setKeyword,
  searchPharmacies,
  setSearchType,
  map
}) => {
  // 검색 타입 url에 저장
  const handleSearchTypeChange = (type) => {
    setSearchType(type); // 버튼 클릭 시 검색 타입 변경
    searchParams.set('filter', type); // URL에 filter 파라미터를 추가/업데이트
    setSearchParams(searchParams); // 업데이트된 파라미터를 URL에 반영
  };

  // 돋보기 클릭시 검색한 약국의 핀들이 중앙으로 가게 지도범위를 재설정
  const handleCenterMap = () => {
    if (searchPharmacies.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      searchPharmacies.forEach((pharmacy) => {
        bounds.extend(new kakao.maps.LatLng(pharmacy.latitude, pharmacy.longitude));
      });
      if (!bounds.isEmpty()) {
        map.setBounds(bounds); // 검색된 약국들을 포함하는 범위로 지도 설정
      }
    } else {
      console.log('검색 결과가 없습니다.');
    }
  };

  const pressEnterEvent = (e) => {
    if (e.keyCode === 13) {
      handleCenterMap();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-1 mb-0 lg:mb-4">
        <button
          className={`px-3 py-1 rounded-lg transition hover:bg-[#074173] hover:text-white ${
            searchType === 'region' ? 'bg-[#074173] text-white' : 'bg-gray-200'
          } font-semibold text-sm`}
          onClick={() => handleSearchTypeChange('region')}
        >
          지역명
        </button>
        <button
          className={`px-3 py-1 rounded-lg transition hover:bg-[#074173] hover:text-white ${
            searchType === 'name' ? 'bg-[#074173] text-white' : 'bg-gray-200'
          } font-semibold text-sm`}
          onClick={() => handleSearchTypeChange('name')}
        >
          약국명
        </button>
        <span className="text-sm">으로 검색하기</span>
      </div>

      <div className="flex flex-row w-full pr-3 border-2 rounded-lg border-[#074173]">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-3 rounded-lg focus:outline-none"
          onKeyUp={pressEnterEvent}
        />
        <button onClick={handleCenterMap}>
          <FaSearch size={25} color="#074173" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
