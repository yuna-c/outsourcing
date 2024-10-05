import { useState } from 'react';
import SelectBox from './SelectBox';
import SliderResponse from './SliderResponse';
import { useMemo } from 'react';

const PharmaciesSection = ({ pharmacies, REGIONS, tag }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionChange = (region) => {
    setSelectedRegion(region === '전국' ? '' : region);
  };
  const filteredPharmacies = useMemo(
    () => (selectedRegion ? pharmacies.filter((item) => item.region.includes(selectedRegion)) : pharmacies),
    [pharmacies, selectedRegion]
  );

  return (
    <div className="current_pharmacies md:min-h-[800px] p-[30px] py-[60px] bg-white">
      <div className="pharmacy_selector_container">
        <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-center mb-10 md:mb-16 md:p-[40px] p-0 pharmacy_selector_title">
          {`${tag} 영업중인 약국`}
        </h3>
        <SelectBox REGIONS={REGIONS} selectedRegion={selectedRegion} setSelectedRegion={handleRegionChange} />
      </div>
      <SliderResponse pharmacies={filteredPharmacies} tag={tag} />
    </div>
  );
};

export default PharmaciesSection;
