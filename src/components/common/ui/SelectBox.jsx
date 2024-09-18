import React from 'react';

const SelectBox = ({ REGIONS, selectedRegion, setSelectedRegion }) => {
  return (
    <div>
      <span className="select_region text-1x1">지역 선택:</span>
      <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
        <option value="">전국</option>
        {REGIONS.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
