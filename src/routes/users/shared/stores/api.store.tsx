import axios from 'axios';
import { useState } from 'react';

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
