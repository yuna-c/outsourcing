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
        {likedPharmacies.length > 0 ? (
          pharmacies
            .filter((pharmacy) => likedPharmacies.includes(pharmacy.id))
            .map((pharmacy) => (
              <li
                key={pharmacy.id}
                className="flex items-center justify-between w-full p-4 mb-4 border shadow-md rounded cursor-pointer"
                onClick={() => navigate(`/detail/${pharmacy.id}`)} // 클릭 시 약국 디테일 페이지로 이동
              >
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-10 h-10">
                    <IoHeartCircleSharp size={45} />
                  </div>

                  <div className="flex flex-col ">
                    <span className="text-xl font-bold">{pharmacy.name}</span>
                    <p className="text-base  text-gray-600">{pharmacy.address}</p>
                    <p className="mt-5 text-xl font-bold text-black ">{pharmacy.time}</p>
                  </div>
                </div>
                <div className="relative flex items-center justify-end w-10 h-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 삭제 버튼을 클릭해도 리스트 클릭 이벤트가 발생하지 않도록
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
        ) : (
          <div className="flex items-center w-full gap-4 p-3 border shadow-md rounded">
            <div className="flex items-center justify-center w-10 h-10">
              <IoHeartDislikeCircleSharp size={45} />
            </div>
            <span className="text-xl font-bold">아직 좋아요한 약국이 없어요!</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Likes;
