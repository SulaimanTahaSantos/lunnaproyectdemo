'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';

export function usePermissions() {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (role: Role): boolean => {
    return isAuthenticated && user?.role === role;
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    return isAuthenticated && user ? roles.includes(user.role) : false;
  };

  const isAdmin = (): boolean => {
    return hasRole(Role.ADMIN);
  };

  const isTherapist = (): boolean => {
    return hasRole(Role.THERAPIST);
  };

  const isUser = (): boolean => {
    return hasRole(Role.USER);
  };

  const isTherapistOrAdmin = (): boolean => {
    return hasAnyRole([Role.THERAPIST, Role.ADMIN]);
  };

  const canAccessAdminPanel = (): boolean => {
    return isAdmin();
  };

  const canManageSessions = (): boolean => {
    return isTherapistOrAdmin();
  };

  const canBookSessions = (): boolean => {
    return isAuthenticated; 
  };

  return {
    user,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    isAdmin,
    isTherapist,
    isUser,
    isTherapistOrAdmin,
    canAccessAdminPanel,
    canManageSessions,
    canBookSessions,
  };
}