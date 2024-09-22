import { api } from '../instance/axiosInstance';

export const updateLikes = async (id, newLikeCount) => {
  try {
    const response = await api.patch(`/pharmacies/${id}`, {
      likes: newLikeCount
    });
    return response.data;
  } catch (error) {
    throw new Error('좋아요 업데이트에 실패했습니다.');
  }
};
