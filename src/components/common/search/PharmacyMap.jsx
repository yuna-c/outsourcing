import React from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const PharmacyMap = ({ mapCenter, setMap, searchPharmacies, selectedPharmacy, setSelectedPharmacy }) => {
  const navigate = useNavigate();

  // 자세히보기 클릭시 해당 약국의 디테일페이지로 이동
  const handleGoToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  // 커스텀 오버레이 닫기
  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
  };

  return (
    <div className="w-full h-full lg:w-9/12">
      <Map
        center={mapCenter}
        style={{ width: '100%', height: '100%' }}
        className="h-full map"
        level={3}
        onCreate={setMap}
        draggable={true} // 지도 이동 가능 여부
        zoomable={true} // 지도 확대/축소 가능 여부
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
  );
};

export default PharmacyMap;
