import axios from 'axios';
import { useStorage } from '../../hooks';

// Initialize Axios with base url
export const api = axios.create({ baseURL: '' });

// Get interceptor
api.interceptors.request.use(config => {
  const { getItem } = useStorage();
  const token = getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
