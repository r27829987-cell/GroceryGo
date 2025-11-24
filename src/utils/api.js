import axios from 'axios';

const api = axios.create({
  baseURL: '/',
});

// Request interceptor to attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('grocerygo_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
