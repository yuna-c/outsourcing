import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../core/stores/useAuthStore';
import { api } from '../../../core/instance/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { BiSolidCommentX } from 'react-icons/bi';
import { BiSolidCommentDetail } from 'react-icons/bi';
import handleTimeCalculate from '../../../core/hooks/useChangeTime';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteOptions, setShowDeleteOptions] = useState(null);
  const userId = useAuthStore((state) => state.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!userId) {
          console.error('userId가 정의되지 않았습니다.');
          throw new Error('로그인이 필요합니다.');
        }

        const response = await api.get('/pharmacies');
        const allPharmacies = response.data;

        const userReviews = allPharmacies
          .filter((pharmacy) => pharmacy.comments)
          .map((pharmacy) =>
            pharmacy.comments.map((comment) => ({
              ...comment,
              pharmacyId: pharmacy.id, // 약국의 ID를 추가
              pharmacyName: pharmacy.name // 약국 이름을 추가
            }))
          )
          .flat()
          .filter((comment) => comment.userId === userId);

        setReviews(userReviews);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, [userId]);

  // 리뷰 삭제
  const handleDelete = async (reviewId, pharmacyId) => {
    try {
      const response = await api.get(`/pharmacies/${pharmacyId}`);
      const pharmacyData = response.data;

      const updatedComments = pharmacyData.comments.filter((comment) => comment.id !== reviewId);

      await api.patch(`/pharmacies/${pharmacyId}`, { comments: updatedComments });

      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));

      setShowDeleteOptions(null);
    } catch (error) {
      console.log('리뷰 삭제 오류 => ', error);
      setError('리뷰 삭제 오류');
    }
  };

  const toggleDeleteOptions = (reviewId) => {
    setShowDeleteOptions((prevId) => (prevId === reviewId ? null : reviewId));
  };

  // 여백 클릭 시 삭제 옵션 숨기기
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDeleteOptions(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (error) {
    return <div>리뷰 데이터를 불러오는 중 오류 발생: {error}</div>;
  }

  return (
    <div className="relative">
      <ul className="flex-wrap items-center justify-between mb-4 ">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li
              key={review.id}
              className="flex items-center justify-between w-full p-4 mb-4 border shadow-md rounded cursor-pointer "
              onClick={() => navigate(`/detail/${review.pharmacyId}`)} // 클릭 시 약국 디테일 페이지로 이동
            >
              <div className="flex gap-4 ">
                <div className="flex items-center justify-center w-10 h-10">
                  <BiSolidCommentDetail size={35} />
                </div>

                <div className="flex flex-col">
                  <span className="text-xl font-bold">{review.nickname}</span>
                  <p className="mt-2 font-medium text-black ">{review.content}</p>
                  <p className="mt-5 text-gray-600 ">{handleTimeCalculate(review.createdAt)}</p>
                </div>
              </div>
              <div className="relative flex items-center justify-end w-10 h-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 삭제 버튼을 클릭해도 리스트 클릭 이벤트가 발생하지 않도록
                    toggleDeleteOptions(review.id);
                  }}
                  className="text-black"
                >
                  <HiOutlineDotsVertical size={24} />
                </button>
                {showDeleteOptions === review.id && (
                  <div className="absolute z-10 w-24 bg-white border border-gray-300 rounded shadow-lg right-3 top-8">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(review.id, review.pharmacyId);
                      }}
                      className="block w-full px-4 py-2 text-left shadow-md rounded hover:bg-gray-100"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <div className="flex items-center w-full gap-4 p-3 border shadow-md rounded">
            <div className="flex items-center justify-center w-10 h-10">
              <div className="flex items-center justify-center w-10 h-10">
                {' '}
                {/* 아이콘 감싸는 div */}
                <BiSolidCommentX size={35} />
              </div>
            </div>
            <span className="text-xl font-bold">아직 작성한 리뷰가 없어요!</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Review;
