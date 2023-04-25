import { createBaseStore } from 'shared';

/**
const baseApiCreator = axios.create({
  baseURL: 'https://example.com/api',
});

baseApiCreator.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 */
const storeCreator = createBaseStore({ apiUrlBase: 'https://jsonplaceholder.typicode.com' });

export const usersStore = storeCreator({ apiUrl: '/users', uniqueId: 'id' });
