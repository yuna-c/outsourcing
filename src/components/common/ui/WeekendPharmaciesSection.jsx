import PharmaciesSection from './PharmaciesSection';
const WeekendPharmaciesSection = ({ pharmacies, REGIONS }) => {
  return <PharmaciesSection title="주말 영업 약국" pharmacies={pharmacies} REGIONS={REGIONS} />;
};

export default WeekendPharmaciesSection;
