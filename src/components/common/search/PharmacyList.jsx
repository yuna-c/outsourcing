import React from 'react';
import { SlArrowRight } from 'react-icons/sl';

const PharmacyList = ({
  searchPharmacies,
  visiblePharmaciesCount,
  setMapCenter,
  map,
  searchParams,
  setSearchParams,
  setSelectedPharmacy,
  setVisiblePharmaciesCount,
  searchType,
  keyword
}) => {
  const handleShowMore = () => {
    setVisiblePharmaciesCount((prevCount) => prevCount + 10);
  };

  // 카카오 라이브러리가 제공하는 이동 애니메이션(panTo)으로 지도를 부드럽게 이동시키는 함수 선언
  const panTo = (lat, lng) => {
    let zoomLevel = 3;
    if (map) {
      const newCenter = new kakao.maps.LatLng(lat, lng);
      map.panTo(newCenter);
      map.setLevel(zoomLevel);
    }
  };

  // 표시할 약국 리스트 제한 (최대 visiblePharmaciesCount만큼 보여줌)
  const displayedPharmacies = searchPharmacies.slice(0, visiblePharmaciesCount);

  // 약국 리스트 클릭시 해당 약국의 핀이 중심으로 가게 지도 이동
  const handleMoveMap = (lat, lng, id, pharmacy) => {
    setMapCenter({ lat, lng });
    panTo(lat, lng, 2); // 지도를 클릭한 약국의 위치로 이동

    searchParams.set('id', id); // url에 선택된 약국의 id를 저장
    setSearchParams(searchParams);

    setSelectedPharmacy(pharmacy); // 선택된 약국 설정
  };

  return (
    <>
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
    </>
  );
};

export default PharmacyList;
