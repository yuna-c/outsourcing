import React, { useMemo } from 'react';
import Article from '../common/ui/Article';
import Banner from '../common/main/Banner';
import Youtube from '../common/main/Youtube';
import CurrentPharmaciesSection from '../common/main/CurrentPharmaciesSection';
import WeekendPharmaciesSection from '../common/main/WeekendPharmaciesSection';

import './../../assets/styles/main.css';
import { REGIONS } from '../../core/utils/regions';
import { useQuery } from '@tanstack/react-query';
import { fetchPharmacies } from '../../core/api/pharm';

const Main = () => {
  const {
    data: pharmacies = [],
    isPending,
    isError
  } = useQuery({
    queryKey: ['pharmacies'],
    queryFn: fetchPharmacies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선하게 유지
    cacheTime: 10 * 60 * 1000 // 10분 동안 캐시 데이터 유지
  });

  if (isPending) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>에러입니다.</div>;
  }

  return (
    <Article className="!-mt-2 overflow-x-hidden mx-auto main">
      <Banner pharmacies={pharmacies} />
      <div className="pharmacies">
        {/* 지금 영업중인 약국 */}
        <MemoizedCurrentPharmacies pharmacies={pharmacies} />
        {/* 주말 영업하는 약국 */}
        <MemoizedWeekendPharmacies pharmacies={pharmacies} />
      </div>
      <Youtube />
    </Article>
  );
};

const MemoizedCurrentPharmacies = React.memo(({ pharmacies }) => {
  const currentTime = useMemo(() => new Date(), []);
  const openPharmacies = useMemo(() => {
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const now = currentHours * 60 + currentMinutes;

    return pharmacies.filter((item) => {
      const [start, end] = item.time.split('~').map((time) => {
        const [h, m] = time.trim().split(':').map(Number);
        return h * 60 + m;
      });

      if (end < start) {
        return now >= start || now < end;
      }

      return now >= start && now < end;
    });
  }, [pharmacies, currentTime]);

  return <CurrentPharmaciesSection pharmacies={openPharmacies} REGIONS={REGIONS} tag={'야간'} />;
});

const MemoizedWeekendPharmacies = React.memo(({ pharmacies }) => {
  const weekendPharmacies = useMemo(() => {
    return pharmacies.filter(
      (item) => (item.time.includes('토') || item.time.includes('일')) && !item.time.includes('미운영')
    );
  }, [pharmacies]);

  return <WeekendPharmaciesSection pharmacies={weekendPharmacies} REGIONS={REGIONS} tag={'주말'} />;
});

export default Main;
