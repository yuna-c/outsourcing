const SelectBox = ({ REGIONS, selectedRegion, setSelectedRegion }) => {
  return (
    <div className="select_container text-right max-w-[1080px] mx-auto md:px-0  px-3">
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="p-[0.3rem] text-sm font-bold border rounded-lg md:p-2 bg-white border-custom-deepblue focus:ring-white"
      >
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
