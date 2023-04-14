import axios from 'axios';
import { useState } from 'react';
import { createBaseStore } from '../../../../shared/context/api/api-store';

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

const storeCreator = createBaseStore({ apiUrlBase: 'https://jsonplaceholder.typicode.com' });

const usersStore = storeCreator({ apiUrl: '/users', uniqueId: 'id' });
