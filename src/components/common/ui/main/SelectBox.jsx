import React from 'react';
import './../../../../assets/styles/mainPage.css';
const SelectBox = ({ REGIONS, selectedRegion, setSelectedRegion }) => {
  return (
    <div className="select_container">
      <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="border ">
        <option value="지역선택">지역선택</option>
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
