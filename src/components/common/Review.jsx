import React, { useState } from 'react';
import { api } from '../../core/instance/axiosInstance';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await api.get('/reviews');
      const userReviews = response.data.filter((review) => review.userId === userId);
      setReviews(userReviews);
    } catch (error) {
      setError('리뷰를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Review</p>
      {/* Json 서버 데이터 */}
    </div>
  );
};

export default Review;
