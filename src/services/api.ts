import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Crear instancia de axios configurada
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Variable para evitar múltiples redirects
let isRedirecting = false;

// Interceptor de REQUEST - Agregar token automáticamente
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Solo agregar token si estamos en el cliente
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

// Interceptor de RESPONSE - Manejar errores automáticamente
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // Manejar error 401 (No autorizado) - Auto-logout
    if (error.response?.status === 401) {
      // Evitar múltiples redirects simultáneos
      if (!isRedirecting && typeof window !== 'undefined') {
        isRedirecting = true;
        
        // Limpiar datos de autenticación
        localStorage.removeItem('lunna_token');
        localStorage.removeItem('lunna_user');
        
        // Redirigir al login
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