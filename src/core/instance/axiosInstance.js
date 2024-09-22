import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const api = axios.create({
  baseURL: 'http://localhost:5000'
  //  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : import.meta.env.VITE_API_BASE_URL
});
