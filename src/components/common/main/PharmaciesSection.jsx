import { useState } from 'react';
import SelectBox from './SelectBox';
import SliderResponse from './SliderResponse';

const PharmaciesSection = ({ title, pharmacies, REGIONS, tag }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  return (
    <div className="current_pharmacies md:min-h-[800px] p-[30px] py-[60px] bg-white">
      <div className="pharmacy_selector_container">
        <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
          {title}
        </h3>
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
