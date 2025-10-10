'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
  fallbackPath?: string;
}

export default function PrivateRoute({ 
  children, 
  requiredRoles = [], 
  fallbackPath = '/auth/login' 
}: PrivateRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; 

    if (!isAuthenticated) {
      router.push(fallbackPath);
      return;
    }

    if (requiredRoles.length > 0 && user) {
      const hasRequiredRole = requiredRoles.includes(user.role);
      
      if (!hasRequiredRole) {
        router.push('/dashboard'); 
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, router, fallbackPath]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando autenticación...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}