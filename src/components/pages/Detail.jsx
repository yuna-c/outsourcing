import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:4000/pharmacies';

const fetchData = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }
  const data = await response.json();
  return data;
};

const Detail = () => {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPharmacyData = async () => {
      try {
        const data = await fetchData(id);
        setPharmacy(data);
      } catch (err) {
        setError(err.message);
      }
    };
    getPharmacyData();
  }, [id]);

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  if (!pharmacy) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>{pharmacy.name}</h2>
      <p>주소 : {pharmacy.address}</p>
      <p>전화번호 : {pharmacy.phone}</p>
      <p>영업시간 : {pharmacy.time}</p>
      <p>위도 : {pharmacy.latitude}</p>
      <p>경도 : {pharmacy.longitude}</p>
    </div>
  );
};

export default Detail;
