import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../core/instance/axiosInstance';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { updateLikes } from '../../core/instance/axiosInstance';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

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
  const [selectedPharmacy, setSelectedPharmacy] = useState(null); // 선택된 약국
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

  // 커스텀 오버레이 닫기
  const handleCloseOverlay = () => {
    setSelectedPharmacy(null);
  };

  return (
    <div className="flex justify-center items-start p-8 min-h-screen">
      <div className="bg-[#E9EFEC] shadow-lg rounded-lg p-6 w-1/3">
        <h2 className="flex justify-between items-center mb-4 text-4xl font-bold">
          {pharmacy.name}
          <button onClick={handleLike}>
            {liked ? <AiFillHeart size={30} color="red" /> : <AiOutlineHeart size={30} color="gray" />}
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
        <div className="w-full h-96 rounded-lg flex justify-center items-center">
          <Map
            center={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
            style={{ width: '800px', height: '400px' }}
            level={3}
          >
            <MapMarker
              position={{ lat: pharmacy.latitude, lng: pharmacy.longitude }}
              onClick={() => setSelectedPharmacy(pharmacy)} // 마커 클릭 시 선택된 약국으로 설정
            >
              {selectedPharmacy && selectedPharmacy.id === pharmacy.id && (
                <CustomOverlayMap
                  position={{ lat: selectedPharmacy.latitude, lng: selectedPharmacy.longitude }}
                  yAnchor={1.3}
                  xAnchor={0.5}
                >
                  <div className="bg-white rounded-lg shadow-lg p-3 w-64 text-pretty">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{selectedPharmacy.name}</h3>
                      <div className="close cursor-pointer" onClick={handleCloseOverlay} title="닫기">
                        <IoClose size={20} />
                      </div>
                    </div>
                    <div className="text-gray-600">
                      <p className="mb-1 text-sm break-words">{selectedPharmacy.address}</p>
                      <span className="text-sm">{selectedPharmacy.phone}</span>
                    </div>
                  </div>
                </CustomOverlayMap>
              )}
            </MapMarker>
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Detail;
