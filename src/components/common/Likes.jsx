import React, { useState, useEffect } from 'react';
import useAuthStore from '../../core/stores/useAuthStore';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { IoHeartDislikeCircleSharp } from 'react-icons/io5';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { api } from '../../core/instance/axiosInstance';

const Likes = () => {
  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser
  }));
  const [pharmacies, setPharmacies] = useState([]);
  const [likedPharmacies, setLikedPharmacies] = useState([]);
  const [showDeleteOptions, setShowDeleteOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 약국 데이터 불러오기
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await api.get(`/pharmacies`);
        setPharmacies(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  // 사용자가 좋아요한 약국 데이터를 가져오기
  useEffect(() => {
    if (user?.likedPharmacies) {
      setLikedPharmacies(user.likedPharmacies);
    }
  }, [user]);

  // 좋아요 버튼 클릭 핸들러
  const handleLike = (pharmacy) => {
    const pharmacyName = pharmacy.name;
    if (likedPharmacies.includes(pharmacyName)) {
      // 좋아요 취소
      const updatedLikes = likedPharmacies.filter((name) => name !== pharmacyName);
      setLikedPharmacies(updatedLikes);
      updateLikes(updatedLikes); //  좋아요 취소 요청
    } else {
      // 좋아요 추가
      const updatedLikes = [...likedPharmacies, pharmacyName];
      setLikedPharmacies(updatedLikes);
      updateLikes(updatedLikes); // 좋아요 추가 요청
    }
  };

  // 좋아요 업데이트 요청 함수
  const updateLikes = async (updatedLikes) => {
    try {
      await api.patch(`/users/${user.userId}`, {
        likedPharmacies: updatedLikes
      });
      // Zustand 상태 업데이트
      setUser({ ...user, likedPharmacies: updatedLikes });
    } catch (error) {
      console.error('Failed to update likes', error);
    }
  };

  // 삭제
  const handleDelete = (pharmacyName) => {
    const updatedPharmacies = pharmacies.filter((pharmacy) => pharmacy.name !== pharmacyName);
    setPharmacies(updatedPharmacies);
    setShowDeleteOptions(null);
  };

  // 공유 기능 (단순히 콘솔 로그로 시뮬레이션)
  const handleShare = (pharmacyName) => {
    alert(`${pharmacyName} 공유 링크가 복사되었습니다!`);
  };

  // 삭제 버튼 보이기, 숨기기
  const toggleDeleteOptions = (pharmacyName) => {
    if (showDeleteOptions === pharmacyName) {
      setShowDeleteOptions(null);
    } else {
      setShowDeleteOptions(pharmacyName);
    }
  };

  // 여백 클릭 시 삭제 버튼 숨기기
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDeleteOptions(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 로딩 및 에러 상태 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading pharmacies: {error.message}</div>;

  return (
    <div className="relative">
      <ul className="flex items-center justify-between p-4 mb-4 border border-black rounded">
        {likedPharmacies.length === 0 ? (
          <div className="flex items-center gap-4">
            <IoHeartDislikeCircleSharp size={45} />
            <span className="text-xl font-bold">아직 좋아요한 약국이 없어요!</span>
          </div>
        ) : (
          pharmacies
            .filter((pharmacy) => likedPharmacies.includes(pharmacy.name))
            .map((pharmacy) => (
              <li
                key={pharmacy.name}
                className="flex items-center justify-between p-4 mb-4 border border-gray-600 rounded"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(pharmacy);
                    }}
                  >
                    <IoHeartCircleSharp
                      size={45}
                      className={likedPharmacies.includes(pharmacy.name) ? 'text-red-500' : 'text-gray-500'}
                    />
                  </button>
                  <div>
                    <span className="text-xl font-bold">{pharmacy.name}</span>
                    <p className="text-gray-600">{pharmacy.address}</p>
                    <p className="mt-5 text-xl font-bold text-black">{pharmacy.time}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDeleteOptions(pharmacy.name);
                    }}
                    className="text-black"
                  >
                    <HiOutlineDotsVertical size={24} />
                  </button>
                  {showDeleteOptions === pharmacy.name && (
                    <div className="absolute right-0 z-10 bg-white border border-gray-300 rounded shadow-lg top-8">
                      <button
                        onClick={() => handleDelete(pharmacy.name)}
                        className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => handleShare(pharmacy.name)}
                        className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                      >
                        공유
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default Likes;
