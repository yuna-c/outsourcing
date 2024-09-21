import React, { useEffect, useState } from 'react';
import useAuthStore from '../../core/stores/useAuthStore';
import { api } from '../../core/instance/axiosInstance';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // userId가 있는지 확인
        if (!userId) {
          console.error('userId가 정의되지 않았습니다.');
          throw new Error('로그인이 필요합니다.');
        }

        const response = await api.get('/pharmacies');
        const allPharmacies = response.data;

        // 약국 데이터에서 comments 배열이 없는 경우를 대비한 안전한 접근
        const userReviews = allPharmacies
          .filter((pharmacy) => pharmacy.comments) // comments가 있는 경우만
          .map((pharmacy) => pharmacy.comments)
          .flat()
          .filter((comment) => comment.userId === userId);

        setReviews(userReviews);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReviews();
  }, [userId]);

  if (error) {
    return <div>리뷰 데이터를 불러오는 중 오류 발생: {error}</div>;
  }

  return (
    <div>
      <h2>내가 작성한 리뷰</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p>{review.nickname}</p>
            <p>{review.content}</p>
            <p>{new Date(review.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default Review;
