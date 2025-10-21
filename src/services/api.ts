import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRedirecting = false;

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('lunna_token');
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (!isRedirecting && typeof window !== 'undefined') {
        isRedirecting = true;
        
        localStorage.removeItem('lunna_token');
        localStorage.removeItem('lunna_user');
        
        setTimeout(() => {
          window.location.href = '/auth/login?message=session_expired';
          isRedirecting = false;
        }, 500);
      }
    }

    return Promise.reject(error);
  }
);

export default api;