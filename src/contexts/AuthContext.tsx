'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@/types';
import api from '@/services/api';
import { isTokenExpired, getTokenTimeRemaining, isTokenNearExpiry } from '@/utils/tokenUtils';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  showLoginAlert: boolean;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (userData: RegisterRequest) => Promise<AuthResponse>;
  logout: (reason?: string) => void;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
  hideLoginAlert: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem('lunna_token');
        const storedUser = localStorage.getItem('lunna_user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('lunna_token');
        localStorage.removeItem('lunna_user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Efecto para monitorear la expiración del token
  useEffect(() => {
    if (token && isAuthenticated) {
      // Verificar inmediatamente si el token está expirado
      if (isTokenExpired(token)) {
        logout('expired');
        return;
      }

      // Configurar intervalo para verificar cada 30 segundos
      checkIntervalRef.current = setInterval(() => {
        checkTokenExpiration();
      }, 30000); // 30 segundos

      // Verificar inmediatamente
      checkTokenExpiration();
    } else {
      // Limpiar intervalo si no hay token
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    }

    // Cleanup al desmontar o cambiar dependencies
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, [token, isAuthenticated]);

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('lunna_token', newToken);
      localStorage.setItem('lunna_user', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
      
      // Mostrar alerta de login exitoso
      setShowLoginAlert(true);

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('lunna_token', newToken);
      localStorage.setItem('lunna_user', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);

      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (reason?: string) => {
    // Limpiar el intervalo de verificación
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }

    localStorage.removeItem('lunna_token');
    localStorage.removeItem('lunna_user');

    setToken(null);
    setUser(null);

    // Mostrar mensaje si fue por expiración
    if (reason === 'expired') {
      console.warn('🔒 Sesión expirada - Redirigiendo al login');
      // Podrías mostrar un toast aquí
    }

    window.location.href = '/auth/login';
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('lunna_user', JSON.stringify(updatedUser));
    }
  };

  // Función para verificar y manejar expiración de token
  const checkTokenExpiration = () => {
    if (!token) return;

    if (isTokenExpired(token)) {
      console.warn('🔒 Token expirado - Cerrando sesión automáticamente');
      logout('expired');
      return;
    }

    // Token válido, continuar con el monitoreo
  };

  const refreshUser = async (): Promise<void> => {
    try {
      if (!token) return;
      
      const response = await api.get<{ user: User }>('/me');
      const updatedUser = response.data.user;
      
      setUser(updatedUser);
      localStorage.setItem('lunna_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error refreshing user:', error);
      logout();
    }
  };

  const hideLoginAlert = () => {
    setShowLoginAlert(false);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    showLoginAlert,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
    hideLoginAlert,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};