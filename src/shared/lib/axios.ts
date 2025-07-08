import axios from 'axios';
import type { TokenI } from '../types/types';

export const api = axios.create({
  baseURL: 'https://telsot.uz/',
});

api.interceptors.request.use((config) => {
  let data = localStorage.getItem('auth');
  const auth: TokenI | null = data ? JSON.parse(data) : null;

  if (auth?.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }

  return config;
});
