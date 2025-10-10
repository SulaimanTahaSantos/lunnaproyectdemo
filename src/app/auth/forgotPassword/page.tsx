'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Moon } from 'lucide-react';

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import PublicRoute from '@/components/auth/PublicRoute';

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <Moon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
            <h1 className="text-3xl font-extrabold text-gray-900">
              Lunna Platform
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Recupera el acceso a tu cuenta
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        </div>
      </div>
    </PublicRoute>
  );
}