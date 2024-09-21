import PharmaciesSection from './PharmaciesSection';

const CurrentPharmaciesSection = ({ pharmacies, REGIONS, tag }) => {
  return <PharmaciesSection title="지금 영업중인 약국" pharmacies={pharmacies} REGIONS={REGIONS} tag={tag} />;
};

export default CurrentPharmaciesSection;
