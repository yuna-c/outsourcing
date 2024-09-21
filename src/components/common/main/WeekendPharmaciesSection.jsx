import PharmaciesSection from './PharmaciesSection';
const WeekendPharmaciesSection = ({ pharmacies, REGIONS, tag }) => {
  return <PharmaciesSection title="주말 영업 약국" pharmacies={pharmacies} REGIONS={REGIONS} tag={tag} />;
};

export default WeekendPharmaciesSection;
