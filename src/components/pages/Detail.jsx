import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../core/instance/axiosInstance';
import { Map } from 'react-kakao-maps-sdk';
import { updateLikes } from '../../core/instance/axiosInstance'; // 좋아요 업데이트 함수
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // 하트 아이콘 불러오기

const fetchData = async (id) => {
  try {
    const response = await api.get(`/pharmacies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }
};

const Detail = () => {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const likedPharmacies = JSON.parse(localStorage.getItem('likedPharmacies')) || [];
    setLiked(likedPharmacies.includes(id));
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLike = async () => {
    const newLikeCount = pharmacy.likes + (liked ? -1 : 1);

    // Optimistic Update
    setPharmacy((prev) => ({
      ...prev,
      likes: newLikeCount
    }));

    try {
      await updateLikes(id, newLikeCount);

      const likedPharmacies = JSON.parse(localStorage.getItem('likedPharmacies')) || [];
      if (liked) {
        const updatedLikes = likedPharmacies.filter((pharmacyId) => pharmacyId !== id);
        localStorage.setItem('likedPharmacies', JSON.stringify(updatedLikes));
      } else {
        likedPharmacies.push(id);
        localStorage.setItem('likedPharmacies', JSON.stringify(likedPharmacies));
      }
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    } finally {
      setLiked(!liked);
    }
  };

  useEffect(() => {
    const getPharmacyData = async () => {
      try {
        setLoading(true);
        const data = await fetchData(id);
        setPharmacy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPharmacyData();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="flex justify-center items-start p-8 bg-gray-100 min-h-screen">
      <div className="bg-[#E9EFEC] shadow-lg rounded-lg p-6 w-1/3">
        <h2 className="flex justify-between items-center mb-4 text-4xl font-bold">
          {pharmacy.name}
          <button onClick={handleLike}>
            {liked ? (
              <AiFillHeart size={30} color="red" /> // 채워진 하트
            ) : (
              <AiOutlineHeart size={30} color="gray" /> // 비어 있는 하트
            )}
          </button>
        </h2>
        <div className="text-lg font-semibold leading-10">
          <p>주소 : {pharmacy.address}</p>
          <p>전화번호 : {pharmacy.phone}</p>
          <p>영업시간 : {pharmacy.time}</p>
        </div>
        <div className="text-right">
          <button
            className="bg-[#9BDBA6] text-gray-800 font-semibold py-2 px-4 rounded shadow-md hover:bg-[#478485] focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={handleGoBack}
          >
            돌아가기
          </button>
        </div>
      </div>
      <div className="w-2/3 pl-8">
        <div className="w-full h-96 bg-gray-300 rounded-lg flex justify-center items-center">
          <Map
            center={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
            style={{ width: '800px', height: '600px' }}
            level={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
