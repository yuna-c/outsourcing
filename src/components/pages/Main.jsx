import { useState, useEffect } from 'react';
import Article from '../common/ui/Article';
import Banner from '../common/main/Banner';
import Youtube from '../common/main/Youtube';
import CurrentPharmaciesSection from '../common/main/CurrentPharmaciesSection';
import WeekendPharmaciesSection from '../common/main/WeekendPharmaciesSection';

import './../../assets/styles/main.css';
import { REGIONS } from '../../core/utils/regions';
import { api } from '../../core/instance/axiosInstance';
import Footer from '../common/Footer';

const Main = () => {
  const [data, setData] = useState(null);
  const [openPharmacies, setOpenPharmacies] = useState([]);
  const [weekendPharmacies, setWeekendPharmacies] = useState([]);

  const addData = async () => {
    try {
      const response = await api.get(`/pharmacies`);
      setData(response.data);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 현재 영업중인 약국
  const filterOpenPharmacies = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const now = currentHours * 60 + currentMinutes; // 현재 시간을 분으로 변환

    const filteredPharmacies = data.filter((item) => {
      const [start, end] = item.time.split('~').map((time) => {
        const [h, m] = time.trim().split(':').map(Number);
        return h * 60 + m; // 시간을 분으로 변환
      });

      // 종료 시간이 자정(00:00) 이후인 경우 처리
      if (end < start) {
        return now >= start || now < end; // 시작 시간 이후이거나 자정 이전인 경우
      }

      return now >= start && now < end; // 일반적인 경우
    });

    setOpenPharmacies(filteredPharmacies);
  };

  // 주말 운영 약국
  const filterWeekendPharmacies = () => {
    const filteredWeekendPharmacies = data.filter(
      (item) => (item.time.includes('토') || item.time.includes('일')) && !item.time.includes('미운영')
    );
    setWeekendPharmacies(filteredWeekendPharmacies);
  };

  useEffect(() => {
    addData();
  }, []);

  useEffect(() => {
    if (data) {
      filterOpenPharmacies();
      filterWeekendPharmacies();
    }
  }, [data]);

  return (
    <>
      <Article className="!-mt-2 overflow-x-hidden mx-auto main">
        {/* 배너 부분 */}
        <Banner data={data} />

        {/* 지금 영업중인 약국 */}
        <CurrentPharmaciesSection pharmacies={openPharmacies} REGIONS={REGIONS} tag={'야간'} />

        {/* 주말 영업하는 약국 */}
        <WeekendPharmaciesSection pharmacies={weekendPharmacies} REGIONS={REGIONS} tag={'주말'} />

        {/* 유트브 */}
        <Youtube />
      </Article>
    </>
  );
};

export default Main;

/* Rectangle 32 */
