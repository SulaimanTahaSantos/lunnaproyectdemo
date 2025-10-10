'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types';

interface ProtectedLinkProps {
  href: string;
  children: ReactNode;
  requiredRoles?: Role[];
  className?: string;
  fallback?: ReactNode;
}

export default function ProtectedLink({
  href,
  children,
  requiredRoles = [],
  className = '',
  fallback = null,
}: ProtectedLinkProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return fallback;
  }

  if (requiredRoles.length === 0) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const hasRequiredRole = requiredRoles.includes(user.role);

  if (!hasRequiredRole) {
    return fallback;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}