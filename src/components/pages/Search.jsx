import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { api, fetchPharmacies } from '../../core/instance/axiosInstance';

import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

import { SlArrowRight } from 'react-icons/sl';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || ''); // 검색 키워드 관리
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [map, setMap] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); // 선택된 약국
  const [searchType, setSearchType] = useState('region'); // 검색 타입
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
      const response = await api.get(`pharmacies/${searchId}`); // 쿼리스트링의 id값이 바뀔 때마다 동적으로 get요청
      const data = response.data;
      setMapCenter({ lat: data?.latitude, lng: data?.longitude }); // searchParams로 가져온 약국 데이터의 위경도값으로 바꿔줌
      setSelectedPharmacy(data); // 커스텀오버레이도 유지시킴
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
      // 검색한 약국의 갯수가 0보다 클 경우
      const bounds = new kakao.maps.LatLngBounds();
      searchPharmacies.forEach((pharmacy) => {
        bounds.extend(new kakao.maps.LatLng(pharmacy.latitude, pharmacy.longitude));
      });

      // 중심 좌표를 계산해서 스토어에 저장
      const center = bounds.getCenter();
      useMapStore.getState().setCenter({ lat: center.getLat(), lng: center.getLng() });

      map.setBounds(bounds);
    }
  };

  return (
    <section className=" flex flex-row justify-center border-8 w-full rounded-lg">
      {/* 검색영역 */}
      <article className="flex flex-col items-start p-5 w-1/4 h-[750px] gap-5 ">
        <div className="flex flex-row gap-1 items-center">
          <button
            className={`px-3 py-1 rounded-lg transition hover:bg-custom-teal ${
              searchType === 'region' ? 'bg-custom-teal text-white' : 'bg-gray-200'
            } font-semibold text-sm font-custom`}
            onClick={() => handleSearchTypeChange('region')}
          >
            지역명
          </button>
          <button
            className={`px-3 py-1 rounded-lg transition hover:bg-custom-teal ${
              searchType === 'name' ? 'bg-custom-teal text-white' : 'bg-gray-200'
            } font-semibold text-sm font-custom`}
            onClick={() => handleSearchTypeChange('name')}
          >
            약국명
          </button>
          <span className="text-sm"> 으로 검색하기</span>
        </div>
        <div className="border-8 w-full flex flex-row pr-3 rounded-lg">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-3 rounded-lg"
          />
          {/*돋보기아이콘 클릭시 검색된 핀들이 맵 중심으로 이동*/}
          <button onClick={handleCenterMap}>
            <FaSearch size={25} />
          </button>
        </div>
        <ul className="flex flex-col gap-3 h-[100%]	overflow-auto w-full">
          {searchPharmacies.map((pharmacy, id) => (
            <li
              key={id}
              className="flex flex-row justify-between items-center gap-3 cursor-pointer shadow-lg p-3 rounded-lg transition-transform transform hover:-translate-y-1 duration-500 w-full"
              onClick={() => handleMoveMap(pharmacy.latitude, pharmacy.longitude, pharmacy.id, pharmacy)} // 리스트 클릭시 맵의 중심 이동
            >
              <div className="w-10/12">
                <h3 className="text-lg font-semibold text-gray-800">{pharmacy.name}</h3>
                <p className="mb-1 text-sm break-words text-gray-600">{pharmacy.address}</p>
                <span className="mb-1 text-sm break-words text-gray-600">{pharmacy.phone}</span>
              </div>
              <div className="bg-custom-teal p-3 rounded-full text-white">
                <SlArrowRight size={15} />
              </div>
            </li>
          ))}
        </ul>
      </article>
      {/* 지도영역 */}
      <article className="w-full md:w-9/12">
        <Map center={mapCenter} style={{ width: '100%', height: '750px' }} level={3} onCreate={setMap}>
          {searchPharmacies.map((pharmacy) => (
            <MapMarker // 마커
              key={pharmacy.id}
              position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
              onClick={() => setSelectedPharmacy(pharmacy)}
            />
          ))}
          {/* {selectedPharmacy && selectedPharmacy.id ===pharmacy.id && ()} */}
          {selectedPharmacy && (
            <CustomOverlayMap // 커스텀오버레이
              position={{ lat: selectedPharmacy.latitude, lng: selectedPharmacy.longitude }}
              yAnchor={1.3}
              xAnchor={0.5}
            >
              <div className=" bg-white  rounded-lg shadow-lg p-3 w-64 text-pretty">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{selectedPharmacy.name}</h3>
                  <div className="close cursor-pointer" onClick={handleCloseOverlay} title="닫기">
                    <IoClose size={20} />
                  </div>
                </div>
                <div className="text-gray-600">
                  <p className="mb-1 text-sm break-words">{selectedPharmacy.address}</p>
                  <span className="text-sm">{selectedPharmacy.phone}</span>
                </div>
                <button
                  onClick={() => handleGoToDetail(selectedPharmacy.id)}
                  className="mt-3 bg-custom-teal text-white px-4 py-2 rounded-lg hover:bg-custom-green transition w-full text-center"
                >
                  자세히 보기
                </button>
              </div>
            </CustomOverlayMap>
          )}
          {/* </MapMarker> */}
          {/* ))} */}
        </Map>
      </article>
    </section>
  );
};

export default Search;
