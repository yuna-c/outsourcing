import { api } from '../instance/axiosInstance';

export const fetchPharmacies = async () => {
  const response = await api.get('/pharmacies');
  return response.data;
};
