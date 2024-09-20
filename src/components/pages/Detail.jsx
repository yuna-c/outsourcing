import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../core/instance/axiosInstance';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { updateLikes } from '../../core/instance/axiosInstance';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SlArrowLeft } from 'react-icons/sl';
import useAuthStore from '../../core/stores/useAuthStore';

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
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const navigate = useNavigate();

  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (userId) {
      const likedPharmacies = JSON.parse(localStorage.getItem(`likedPharmacies_${userId}`)) || [];
      setLiked(likedPharmacies.includes(id));
    }
  }, [id, userId]);

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
      const likedPharmacies = JSON.parse(localStorage.getItem(`likedPharmacies_${userId}`)) || [];
      if (liked) {
        const updatedLikes = likedPharmacies.filter((pharmacyId) => pharmacyId !== id);
        localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(updatedLikes));
      } else {
        likedPharmacies.push(id);
        localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(likedPharmacies));
      }
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    } finally {
      setLiked(!liked);
    }
  };

  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
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
    <div className="flex justify-center items-start p-8 min-h-screen">
      <div className="shadow-lg rounded-lg p-6 w-1/3">
        <h2 className="flex justify-start items-center mb-4 text-4xl font-bold">
          <button onClick={handleGoBack}>
            <SlArrowLeft size={30} className="mr-4" />
          </button>
          <span className="mr-auto">{pharmacy.name}</span>
          <button onClick={handleLike}>
            {liked ? <AiFillHeart size={30} color="red" /> : <AiOutlineHeart size={30} color="gray" />}
          </button>
        </h2>
        <div className="text-lg font-semibold leading-10">
          <p>주소 : {pharmacy.address}</p>
          <p>전화번호 : {pharmacy.phone}</p>
          <p>영업시간 : {pharmacy.time}</p>
        </div>
      </div>
      <div className="w-2/3 pl-8">
        <div className="w-full h-96 rounded-lg flex justify-center items-center">
          <Map
            center={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
            style={{ width: '100%', height: '100%' }}
            level={3}
          >
            <MapMarker
              position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
              onClick={() => setSelectedPharmacy(pharmacy)}
            />
            {selectedPharmacy && (
              <CustomOverlayMap
                position={{ lat: selectedPharmacy.latitude, lng: selectedPharmacy.longitude }}
                yAnchor={1.3}
                xAnchor={0.5}
              >
                <div className="bg-white rounded-lg shadow-lg p-3 w-64 text-pretty">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{selectedPharmacy.name}</h3>
                    <button className="close cursor-pointer" onClick={handleCloseOverlay} title="닫기">
                      X
                    </button>
                  </div>
                  <div className="text-gray-600">
                    <p className="mb-1 text-sm break-words">{selectedPharmacy.address}</p>
                    <span className="text-sm">{selectedPharmacy.phone}</span>
                  </div>
                </div>
              </CustomOverlayMap>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Detail;
