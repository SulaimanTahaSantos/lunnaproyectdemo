'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    gray: 'text-gray-400',
  };

  return (
    <Loader2 
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`} 
    />
  );
}

interface ButtonLoadingProps {
  isLoading?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function ButtonLoading({
  isLoading = false,
  children,
  loadingText = 'Cargando...',
  className = '',
  disabled = false,
  onClick,
  type = 'button'
}: ButtonLoadingProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center space-x-2 ${className} ${
        (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {isLoading && <LoadingSpinner size="sm" color="white" />}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
}

interface PageLoadingProps {
  message?: string;
  className?: string;
}

export function PageLoading({ 
  message = 'Cargando página...', 
  className = '' 
}: PageLoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] space-y-4 ${className}`}>
      <LoadingSpinner size="xl" />
      <div className="text-center">
        <p className="text-gray-600 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-2">Por favor, espera un momento</p>
      </div>
    </div>
  );
}

interface FullPageLoadingProps {
  message?: string;
  showLogo?: boolean;
}

export function FullPageLoading({ 
  message = 'Cargando...', 
  showLogo = true 
}: FullPageLoadingProps) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {showLogo && (
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-4xl">🌙</span>
          <span className="text-2xl font-bold text-gray-900">Lunna Platform</span>
        </div>
      )}
      
      <LoadingSpinner size="xl" />
      
      <div className="mt-6 text-center">
        <p className="text-gray-700 font-medium">{message}</p>
        <p className="text-sm text-gray-500 mt-2">Configurando tu experiencia...</p>
      </div>
    </div>
  );
}

interface InlineLoadingProps {
  text?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function InlineLoading({ 
  text = 'Cargando...', 
  size = 'sm',
  className = '' 
}: InlineLoadingProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LoadingSpinner size={size} />
      <span className={`text-gray-600 ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {text}
      </span>
    </div>
  );
}