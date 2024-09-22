import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../core/instance/axiosInstance';
import { fetchPharmacies } from '../../core/api/pharm';
import { IoMdSearch } from 'react-icons/io';
import PharmacyMap from '../common/search/PharmacyMap';
import PharmacyList from '../common/search/PharmacyList';
import SearchInput from '../common/search/SearchInput';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || ''); // 검색 키워드 관리
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [map, setMap] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); // 선택된 약국
  const [searchType, setSearchType] = useState(searchParams.get('filter') || 'name'); // 검색 타입
  const [visiblePharmaciesCount, setVisiblePharmaciesCount] = useState(10); // 초기 약국 표시 개수
  const [isSearchVisible, setIsSearchVisible] = useState(false); // 모바일에서 검색영역 토글

  // 약국 데이터를 가져옴
  const {
    data: pharmacies,
    isPending,
    isError
  } = useQuery({
    queryKey: ['pharmacies'],
    queryFn: fetchPharmacies
  });

  // 검색한 약국의 id값을 searchParams로 가져옴
  const searchId = searchParams.get('id');

  //로직변경이 필요하다.
  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        if (searchId) {
          // searchId가 존재할 때만 API 요청 실행
          const response = await api.get(`pharmacies/${searchId}`);
          const data = response.data;
          // 아래 두 줄은 필요하다.
          setMapCenter({ lat: data?.latitude, lng: data?.longitude }); // searchParams로 가져온 약국 데이터의 위경도값으로 바꿔줌
          setSelectedPharmacy(data); // 커스텀 오버레이도 유지시킴
        }
      } catch (error) {
        console.error('Error fetching pharmacy:', error); // 에러 로그 출력
      }
    };
    fetchPharmacy();
  }, []);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  // 검색어(keyword)로 리스트 필터링해서 보여줌
  const searchPharmacies = pharmacies.filter((pharmacy) => {
    const { name, address, region, subregion } = pharmacy;
    let searchContent;

    if (searchType === 'region') {
      searchContent = `${subregion} ${region} ${address}`;
    } else if (searchType === 'name') {
      searchContent = name;
    } else {
      searchContent = address;
    }

    // 검색어가 검색 내용에 포함되는지 확인
    return searchContent.includes(keyword);
  });

  return (
    <article className="relative flex flex-row justify-center h-full m-auto overflow-hidden">
      {/* 모바일에서 검색영역 토글 버튼 */}
      <button
        className="absolute z-40 block w-10 h-10 p-2 mb-4 bg-white border rounded-full border-custom-deepblue bottom-1 right-3 lg:hidden"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
      >
        {isSearchVisible ? (
          <IoMdSearch className="w-6 h-6 text-custom-deepblue" />
        ) : (
          <IoMdSearch className="w-6 h-6 text-custom-skyblue" />
        )}
      </button>

      <div
        className={`absolute top-0 left-0 right-0 bottom-0 z-30 bg-white p-5 h-full ${
          isSearchVisible ? 'block' : 'hidden'
        } lg:relative lg:block lg:w-1/3 xl:w-1/4 lg:h-[calc(100vh-10rem)] space-y-4`}
      >
        {/* 검색영역 */}
        <SearchInput
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          searchType={searchType}
          keyword={keyword}
          setKeyword={setKeyword}
          visiblePharmaciesCount={visiblePharmaciesCount}
          searchPharmacies={searchPharmacies}
          setSearchType={setSearchType}
          map={map}
        />
        {/* 검색영역-리스트 */}
        <PharmacyList
          searchPharmacies={searchPharmacies}
          visiblePharmaciesCount={visiblePharmaciesCount}
          setMapCenter={setMapCenter}
          isSearchVisible={isSearchVisible}
          setIsSearchVisible={setIsSearchVisible}
          map={map}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setSelectedPharmacy={setSelectedPharmacy}
          setVisiblePharmaciesCount={setVisiblePharmaciesCount}
          searchType={searchType}
          keyword={keyword}
        />
      </div>

      {/* 지도영역 */}
      <PharmacyMap
        mapCenter={mapCenter}
        setMap={setMap}
        searchPharmacies={searchPharmacies}
        selectedPharmacy={selectedPharmacy}
        setSelectedPharmacy={setSelectedPharmacy}
      />
    </article>
  );
};

export default Search;
