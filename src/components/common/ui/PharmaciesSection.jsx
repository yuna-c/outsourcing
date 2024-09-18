import React from 'react';
import { useState } from 'react';
import SelectBox from './SelectBox';
import SliderResponse from './SliderResponse';

const PharmaciesSection = ({ title, pharmacies, REGIONS, tag }) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  return (
    <div className="current_pharmacies">
      <div className="pharmacy_selector_container">
        <h3 className="pharmacy_selector_title text-2xl">{title}</h3>
        <SelectBox REGIONS={REGIONS} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
      </div>
      <SliderResponse
        pharmacies={selectedRegion ? pharmacies.filter((item) => item.region.includes(selectedRegion)) : pharmacies}
        tag={tag}
      />
    </div>
  );
};

export default PharmaciesSection;
