import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
  // baseURL: 'http://localhost:5000'
});
