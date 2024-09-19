import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const api = axios.create({
  baseURL: 'http://localhost:5000'
});

export const fetchPharmacies = async () => {
  const response = await axios.get('http://localhost:5000/pharmacies');
  return response.data;
};

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
