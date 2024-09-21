import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, fetchPharmacies } from '../../core/instance/axiosInstance';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { SlArrowRight } from 'react-icons/sl';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || ''); // 검색 키워드 관리
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [map, setMap] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); // 선택된 약국
  const [searchType, setSearchType] = useState(searchParams.get('filter') || 'name'); // 검색 타입
  const [visiblePharmaciesCount, setVisiblePharmaciesCount] = useState(10); // 초기 약국 표시 개수
  const [isSearchVisible, setIsSearchVisible] = useState(false); // 모바일에서 검색영역 토글
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        if (searchId) {
          // searchId가 존재할 때만 API 요청 실행
          const response = await api.get(`pharmacies/${searchId}`);
          const data = response.data;
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

  // 검색 타입 url에 저장
  const handleSearchTypeChange = (type) => {
    setSearchType(type); // 버튼 클릭 시 검색 타입 변경
    searchParams.set('filter', type); // URL에 filter 파라미터를 추가/업데이트
    setSearchParams(searchParams); // 업데이트된 파라미터를 URL에 반영
  };

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

  // 표시할 약국 리스트 제한 (최대 visiblePharmaciesCount만큼 보여줌)
  const displayedPharmacies = searchPharmacies.slice(0, visiblePharmaciesCount);

  // 카카오 라이브러리가 제공하는 이동 애니메이션(panTo)으로 지도를 부드럽게 이동시키는 함수 선언
  const panTo = (lat, lng) => {
    let zoomLevel = 3;
    if (map) {
      const newCenter = new kakao.maps.LatLng(lat, lng);
      map.panTo(newCenter);
      map.setLevel(zoomLevel);
    }
  };

  // 약국 리스트 클릭시 해당 약국의 핀이 중심으로 가게 지도 이동
  const handleMoveMap = (lat, lng, id, pharmacy) => {
    setMapCenter({ lat, lng });
    panTo(lat, lng, 2); // 지도를 클릭한 약국의 위치로 이동

    searchParams.set('id', id); // url에 선택된 약국의 id를 저장
    setSearchParams(searchParams);

    setSelectedPharmacy(pharmacy); // 선택된 약국 설정
  };

  // 자세히보기 클릭시 해당 약국의 디테일페이지로 이동
  const handleGoToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  // 커스텀 오버레이 닫기
  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
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

  const handleShowMore = () => {
    setVisiblePharmaciesCount((prevCount) => prevCount + 10);
  };

  return (
    <article className="relative flex flex-row justify-center h-full m-auto overflow-hidden rounded-lg">
      {/* 모바일에서 검색영역 토글 버튼 */}
      <button
        className="absolute z-50 block w-10 h-10 p-2 mb-4 bg-white border rounded-full border-custom-deepblue bottom-1 right-3 lg:hidden"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
      >
        {isSearchVisible ? (
          <IoMdSearch className="w-6 h-6 text-custom-deepblue" />
        ) : (
          <IoMdSearch className="w-6 h-6 text-custom-skyblue" />
        )}
      </button>

      {/* 검색영역 */}
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 z-30 bg-white p-5 h-full ${
          isSearchVisible ? 'block' : 'hidden'
        } lg:relative lg:block lg:w-1/3 xl:w-1/4 lg:h-[calc(100vh-10rem)] space-y-4`}
      >
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

        <ul className="flex flex-col gap-3 xl:h-[680px] md:h-[80%] h-[70%] overflow-auto">
          {searchPharmacies.length === 0 && (
            <li>
              <p>
                {searchType === 'region' ? '지역명' : '약국명'}으로 검색한 "{keyword}"에 대한 검색결과가 없습니다
              </p>
            </li>
          )}
          {displayedPharmacies.map((pharmacy, id) => (
            <li
              key={id}
              className="flex flex-row items-center justify-between w-full gap-3 p-3 transition-transform duration-500 transform border rounded-lg shadow-md cursor-pointer border-custom-gray hover:-translate-y-1 "
              onClick={() => handleMoveMap(pharmacy.latitude, pharmacy.longitude, pharmacy.id, pharmacy)}
            >
              <div className="">
                <h3 className="mb-2 text-lg font-bold text-gray-800">{pharmacy.name}</h3>
                <p className="text-sm text-gray-600 break-words">{pharmacy.address}</p>
                <span className="mb-1 text-sm text-gray-600 break-words">{pharmacy.phone}</span>
              </div>
              <div className="p-2 text-white rounded-full bg-[#074173]">
                <SlArrowRight
                  size={15}
                  onClick={() => {
                    setIsSearchVisible(false);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        {visiblePharmaciesCount < searchPharmacies.length && (
          <button
            onClick={handleShowMore}
            className="w-full px-4 py-2 mt-3 text-center text-white transition rounded-lg bg-[#074173] hover:bg-[#1679ab]"
          >
            더 보기
          </button>
        )}
      </div>

      {/* 지도영역 */}
      <div className="w-full h-full lg:w-9/12">
        <Map
          center={mapCenter}
          style={{ width: '100%', height: '100%' }}
          className="h-full"
          level={3}
          onCreate={setMap}
        >
          {searchPharmacies.map((pharmacy) => (
            <MapMarker
              key={pharmacy.id}
              position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
              onClick={() => setSelectedPharmacy(pharmacy)}
            />
          ))}
          {selectedPharmacy && (
            <CustomOverlayMap
              position={{ lat: selectedPharmacy.latitude, lng: selectedPharmacy.longitude }}
              yAnchor={1.3}
              xAnchor={0.5}
            >
              <div className="w-64 p-3 bg-white rounded-lg shadow-lg text-pretty">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{selectedPharmacy.name}</h3>
                  <div className="cursor-pointer close" onClick={handleCloseOverlay} title="닫기">
                    <IoClose size={20} />
                  </div>
                </div>
                <div className="text-gray-600">
                  <p className="mb-1 text-sm break-words">{selectedPharmacy.address}</p>
                  <span className="text-sm">{selectedPharmacy.phone}</span>
                </div>
                <button
                  onClick={() => handleGoToDetail(selectedPharmacy.id)}
                  className="w-full px-4 py-2 mt-3 text-center text-white transition rounded-lg bg-[#074173] hover:bg-[#1679ab]"
                >
                  자세히 보기
                </button>
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </div>
    </article>
  );
};

export default Search;
