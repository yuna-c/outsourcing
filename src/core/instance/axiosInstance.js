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
