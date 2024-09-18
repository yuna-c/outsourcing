import { useState, useEffect } from 'react';
import Article from '../common/ui/Article';
import Banner from '../common/ui/Banner';
import './../../assets/styles/mainPage.css';

import CurrentPharmaciesSection from '../common/ui/CurrentPharmaciesSection';
import WeekendPharmaciesSection from '../common/ui/WeekendPharmaciesSection';
import { REGIONS } from '../../core/utils/regions';
import { api } from '../../core/instance/axiosInstance';

const Main = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [openPharmacies, setOpenPharmacies] = useState([]);
  const [weekendPharmacies, setWeekendPharmacies] = useState([]);

  const addData = async () => {
    try {
      const response = await api.get(`/pharmacies`);
      setData(response.data);
      console.log('가져온 데이터:', response.data);
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
    console.log('영업 중인 약국:', filteredPharmacies);
  };

  // 주말 운영 약국
  const filterWeekendPharmacies = () => {
    const filteredWeekendPharmacies = data.filter((item) => item.time.includes('토') || item.time.includes('일'));
    setWeekendPharmacies(filteredWeekendPharmacies);
    console.log('주말영업중약국:', filteredWeekendPharmacies);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // API를 호출하여 검색 결과 가져오는 로직 추가
  };

  return (
    <Article className="main">
      {/* 배너 부분 */}
      <Banner handleSubmit={handleSubmit} query={query} setQuery={setQuery} />
      <div className="max-w-[80%] mx-auto">
        {/* 지금 영업중인 약국 */}
        <CurrentPharmaciesSection pharmacies={openPharmacies} REGIONS={REGIONS} />

        {/* 주말 영업하는 약국 */}
        <WeekendPharmaciesSection pharmacies={weekendPharmacies} REGIONS={REGIONS} />
      </div>
    </Article>
  );
};

export default Main;
