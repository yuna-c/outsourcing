import React from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

const MapSection = ({ pharmacy, selectedPharmacy, onSelectPharmacy, onCloseOverlay }) => {
  return (
    <div className="h-full">
      <Map
        center={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
        style={{ width: '100%', height: '100%' }}
        className="h-full map"
        level={1}
      >
        <MapMarker
          position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
          onClick={() => onSelectPharmacy(pharmacy)}
        />
        {selectedPharmacy && (
          <CustomOverlayMap position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}>
            <div className="relative p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
              <button className="absolute text-gray-500 top-1 right-1 hover:text-black" onClick={onCloseOverlay}>
                &times;
              </button>
              <div className="font-bold">{selectedPharmacy.name}</div>
              <div>{selectedPharmacy.address}</div>
              <div>{selectedPharmacy.phone}</div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </div>
  );
};

export default MapSection;
