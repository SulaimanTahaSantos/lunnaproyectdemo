'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';

interface RoleBasedAccessProps {
  children: ReactNode;
  allowedRoles: Role[];
  fallback?: ReactNode;
}

export default function RoleBasedAccess({ 
  children, 
  allowedRoles, 
  fallback = null 
}: RoleBasedAccessProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return fallback;
  }

  if (allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  return fallback;
}