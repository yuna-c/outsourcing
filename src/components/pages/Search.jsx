import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { fetchPharmacies } from '../../core/instance/axiosInstance';

import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

import { SlArrowRight, SlMagnifier } from 'react-icons/sl';
import { CiMedicalCross } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || ''); // 검색 키워드 관리
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [map, setMap] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); // 선택된 약국
  const [searchType, setSearchType] = useState('name'); // 검색 타입
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

  // 검색어 변경될 때마다 searchParams 업뎃
  useEffect(() => {
    if (keyword) {
      setSearchParams({ keyword: keyword });
    } else {
      setSearchParams({});
    }
  }, [keyword, setSearchParams]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  // 검색어(keyword)로 리스트 필터링해서 보여줌
  const searchPharmacies = pharmacies.filter((pharmacy) => {
    const { name, address, region, subregion } = pharmacy;
    let searchContent;

    if (searchType === 'name') {
      searchContent = name;
    } else if (searchType === 'region') {
      searchContent = `${subregion} ${region} ${address}`;
    } else {
      searchContent = address;
    }

    // 검색어가 검색 내용에 포함되는지 확인
    return searchContent.includes(keyword);
  });

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
  // lat : 위도 / lng : 경도
  const handleMoveMap = (lat, lng, id, pharmacy) => {
    setMapCenter({ lat, lng });
    panTo(lat, lng, 2); // 지도를 클릭한 약국의 위치로 이동
    searchParams.set('select', id);
    setSearchParams(searchParams);
    setSelectedPharmacy(pharmacy); // 선택된 약국 설정
  };

  // 자세히보기 클릭시 해당 약국의 디테일페이지로 이동
  const handleGoToDetail = (id) => {
    navigate(`/detail?id=${id}`);
  };

  // 커스텀 오버레이 닫기
  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
  };

  // 돋보기 클릭시 검색한 약국의 핀들이 중앙으로 가게 지도범위를 재설정
  const handleCenterMap = () => {
    if (searchPharmacies.length > 0) {
      // 검색한 약국의 갯수가 0보다 클 경우
      const bounds = new kakao.maps.LatLngBounds();
      searchPharmacies.forEach((pharmacy) => {
        bounds.extend(new kakao.maps.LatLng(pharmacy.latitude, pharmacy.longitude));
      });
      map.setBounds(bounds);
    }
  };

  return (
    <section className=" flex flex-row justify-center bg-custom-yellow p-5">
      <article className="flex flex-col items-start bg-white p-5 w-96 h-[750px] gap-5">
        <div>
          <button
            className={`px-4 py-2 ${
              searchType === 'region' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } font-semibold text-1x1 font-custom`}
            onClick={() => setSearchType('region')}
          >
            지역명
          </button>
          <button
            className={`px-4 py-2 ${
              searchType === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } font-semibold text-1x1 font-custom`}
            onClick={() => setSearchType('name')}
          >
            약국명
          </button>
          <span className="text-sm"> 으로 검색하기</span>
        </div>
        <div className="border-8 w-full flex flex-row pr-3">
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full p-3" />
          <button onClick={handleCenterMap}>
            <SlMagnifier />
          </button>
        </div>
        <ul className="flex flex-col gap-3 h-[100%]	overflow-auto">
          {searchPharmacies.map((pharmacy, id) => (
            <li
              key={id}
              className="flex flex-row items-center gap-3"
              onClick={() => handleMoveMap(pharmacy.latitude, pharmacy.longitude, pharmacy.id, pharmacy)} // 리스트 클릭시 맵의 중심 이동
            >
              <CiMedicalCross />
              <div>
                <h3>{pharmacy.name}</h3>
                <p>{pharmacy.address}</p>
                <span>{pharmacy.phone}</span>
              </div>
              <SlArrowRight />
            </li>
          ))}
        </ul>
      </article>
      <article className="w-full md:w-9/12">
        <Map center={mapCenter} style={{ width: '100%', height: '750px' }} level={3} onCreate={setMap}>
          {searchPharmacies.map((pharmacy) => (
            <MapMarker
              key={pharmacy.id}
              position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
              onClick={() => setSelectedPharmacy(pharmacy)}
            >
              {selectedPharmacy && selectedPharmacy.id === pharmacy.id && (
                <CustomOverlayMap
                  position={{ lat: selectedPharmacy.latitude, lng: selectedPharmacy.longitude }}
                  yAnchor={1.7}
                >
                  <div className="customoverlay  z-9999 bg-white">
                    <div className="overlay-content">
                      <div className="flex flex-row items-center justify-between">
                        <h3>{selectedPharmacy.name}</h3>
                        <div className="close cursor-pointer" onClick={handleCloseOverlay} title="닫기">
                          <IoClose />
                        </div>
                      </div>
                      <p>{selectedPharmacy.address}</p>
                      <span>{selectedPharmacy.phone}</span>
                      <button onClick={() => handleGoToDetail(selectedPharmacy.id)} className="overlay-detail-button">
                        자세히 보기
                      </button>
                      <button onClick={handleCloseOverlay} className="overlay-close-button">
                        닫기
                      </button>
                    </div>
                  </div>
                </CustomOverlayMap>
              )}
            </MapMarker>
          ))}
        </Map>
      </article>
    </section>
  );
};

export default Search;
