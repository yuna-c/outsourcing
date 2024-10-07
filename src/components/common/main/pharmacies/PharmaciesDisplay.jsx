import React, { useMemo } from 'react';
import PharmaciesSection from './PharmaciesSection';
import { usePharmacies } from '../../../../core/hooks/usePharmacies';
import { REGIONS } from '../../../../core/utils/regions';
const PharmaciesDisplay = () => {
  const { data: pharmacies = [], isPending, isError } = usePharmacies();

  const currentTime = useMemo(() => new Date(), []);

  const filterPharmacies = (type) => {
    if (!pharmacies || pharmacies.length === 0) return [];

    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const now = currentHours * 60 + currentMinutes;

    return pharmacies.filter((item) => {
      const [start, end] = item.time.split('~').map((time) => {
        const [h, m] = time.trim().split(':').map(Number);
        return h * 60 + m;
      });

      const isOpen = end < start ? now >= start || now < end : now >= start && now < end;
      const isWeekend = item.time.includes('토') || item.time.includes('일');

      if (type === 'current') {
        return isOpen;
      }
      if (type === 'weekend') {
        return isWeekend && !item.time.includes('미운영');
      }
      return false;
    });
  };

  const currentPharmacies = useMemo(() => filterPharmacies('current'), [pharmacies, currentTime]);
  const weekendPharmacies = useMemo(() => filterPharmacies('weekend'), [pharmacies]);

  if (isPending) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>에러입니다.</div>;
  }

  return (
    <div className="pharmacies">
      <PharmaciesSection pharmacies={currentPharmacies} REGIONS={REGIONS} tag={'야간'} />
      <PharmaciesSection pharmacies={weekendPharmacies} REGIONS={REGIONS} tag={'주말'} />
    </div>
  );
};

export default PharmaciesDisplay;
