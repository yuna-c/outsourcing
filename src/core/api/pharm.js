import { api } from '../instance/axiosInstance';

export const fetchPharmacies = async (searchId = '') => {
  const response = await api.get(`/pharmacies${searchId ? `/${searchId}` : ''}`); // searchId가 있으면 쿼리스트링 추가
  return response.data;
};
