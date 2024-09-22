import axios from 'axios';

export const auth = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr'
});

export const api = axios.create({
  baseURL: 'https://likeable-piquant-jasmine.glitch.me'
  // http://localhost:5000
});
