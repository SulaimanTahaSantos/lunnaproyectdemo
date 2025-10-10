'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, type LoginForm } from '@/schemas/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoginError('');
      await login(data);
      
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        setLoginError('Credenciales incorrectas. Verifica tu email y contraseña.');
      } else if (error.response?.status === 400) {
        setLoginError(error.response.data.message || 'Datos inválidos.');
      } else if (error.code === 'NETWORK_ERROR') {
        setLoginError('Error de conexión. Verifica tu conexión a internet.');
      } else {
        setLoginError('Error inesperado. Inténtalo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <LogIn className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Correo electrónico"
                className="pl-10"
                error={errors.email?.message}
                autoComplete="email"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                className="pl-10 pr-10"
                error={errors.password?.message}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{loginError}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/auth/forgotPassword"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Credenciales de prueba:
          </h3>
          <div className="space-y-1 text-xs text-blue-700">
            <p><strong>Admin:</strong> admin@lunna.com / admin123</p>
            <p><strong>Terapeuta:</strong> therapist@lunna.com / therapist123</p>
            <p><strong>Usuario:</strong> user@lunna.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
}