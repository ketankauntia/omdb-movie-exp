import axios from 'axios';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

api.interceptors.response.use(
  (response) => {
    if (response.headers['x-cache']) {
      console.log(`[API Cache] ${response.config.url}: ${response.headers['x-cache']}`);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

