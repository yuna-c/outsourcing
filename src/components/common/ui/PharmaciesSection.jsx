import { useState } from 'react';
import SelectBox from './SelectBox';
import SliderResponse from './SliderResponse';

const PharmaciesSection = ({ title, pharmacies, REGIONS }) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  return (
    <div className="current_pharmacies">
      <div className="pharmacy_selector_container">
        <h3 className="text-2xl pharmacy_selector_title">{title}</h3>
        <SelectBox REGIONS={REGIONS} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
      </div>
      <SliderResponse
        pharmacies={selectedRegion ? pharmacies.filter((item) => item.region.includes(selectedRegion)) : pharmacies}
      />
    </div>
  );
};

export default PharmaciesSection;
