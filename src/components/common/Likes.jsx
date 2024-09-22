import { useState, useEffect } from 'react';
import useAuthStore from '../../core/stores/useAuthStore';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { IoHeartDislikeCircleSharp } from 'react-icons/io5';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { fetchPharmacies } from '../../core/api/pharm';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Likes = () => {
  const userId = useAuthStore((state) => state.userId);
  const [likedPharmacies, setLikedPharmacies] = useState([]);
  const [showDeleteOptions, setShowDeleteOptions] = useState(null);

  const navigate = useNavigate();

  // 약국 데이터 쿼리
  const {
    data: pharmacies = [],
    error,
    isLoading
  } = useQuery({
    queryKey: ['pharmacies'],
    queryFn: fetchPharmacies
  });

  useEffect(() => {
    const likedPharmaciesStorage = localStorage.getItem(`likedPharmacies_${userId}`);

    if (likedPharmaciesStorage) {
      setLikedPharmacies(JSON.parse(likedPharmaciesStorage));
    } else {
      setLikedPharmacies([]);
    }
  }, [userId]);

  const handleLike = (pharmacyId) => {
    const updatedLikes = likedPharmacies.includes(pharmacyId)
      ? likedPharmacies.filter((id) => id !== pharmacyId)
      : [...likedPharmacies, pharmacyId];

    setLikedPharmacies(updatedLikes);
    localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(updatedLikes));
  };

  //삭제
  const handleDelete = (pharmacyId) => {
    const updatedLikedPharmacies = likedPharmacies.filter((id) => id !== pharmacyId);

    setLikedPharmacies(updatedLikedPharmacies);
    localStorage.setItem(`likedPharmacies_${userId}`, JSON.stringify(updatedLikedPharmacies));
    setShowDeleteOptions(null);
  };

  // 공유 기능 (단순히 콘솔 로그로 시뮬레이션)
  const handleShare = (pharmacyName) => {
    alert(`${pharmacyName} 공유 링크가 복사되었습니다!`);
  };

  // 삭제 버튼 보이기, 숨기기
  const toggleDeleteOptions = (pharmacyId) => {
    setShowDeleteOptions(showDeleteOptions === pharmacyId ? null : pharmacyId);
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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading pharmacies: {error.message}</div>;

  return (
    <div className="relative">
      <ul className="flex-wrap items-center justify-between mb-4 ">
        {likedPharmacies.length === 0 ? (
          <div className="flex items-center w-full gap-4 p-3 border border-black rounded">
            <IoHeartDislikeCircleSharp size={45} />
            <span className="text-xl font-bold">아직 좋아요한 약국이 없어요!</span>
          </div>
        ) : (
          pharmacies
            .filter((pharmacy) => likedPharmacies.includes(pharmacy.id))
            .map((pharmacy) => (
              <li
                key={pharmacy.id}
                className="flex items-center justify-between w-full p-4 mb-4 border border-black rounded cursor-pointer"
                onClick={() => navigate(`/detail/${pharmacy.id}`)} // 클릭 시 디테일 페이지로
              >
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(pharmacy.id);
                    }}
                    className="mb-auto"
                  >
                    <IoHeartCircleSharp size={45} />
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
                      toggleDeleteOptions(pharmacy.id);
                    }}
                    className="text-black"
                  >
                    <HiOutlineDotsVertical size={24} />
                  </button>
                  {showDeleteOptions === pharmacy.id && (
                    <div className="absolute z-10 w-24 bg-white border border-gray-300 rounded shadow-lg right-3 top-8">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(pharmacy.id);
                        }}
                        className="block w-full px-4 py-2 text-left text-black rounded hover:bg-gray-100"
                      >
                        삭제
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(pharmacy.name);
                        }}
                        className="block w-full px-4 py-2 text-left text-black rounded hover:bg-gray-100"
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
