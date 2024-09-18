import React from 'react';
import PharmaciesSection from './PharmaciesSection';

const CurrentPharmaciesSection = ({ pharmacies, REGIONS }) => {
  return <PharmaciesSection title="지금 영업중인 약국" pharmacies={pharmacies} REGIONS={REGIONS} />;
};

export default CurrentPharmaciesSection;
