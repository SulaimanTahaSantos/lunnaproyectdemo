'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  CheckCircle,
  Users 
} from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { registerSchema, type RegisterForm } from '@/schemas/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Role } from '@/types';

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState<string>('');

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: Role.USER,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = form;

  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      setRegisterError('');
      await registerUser(data);
      
      router.push('/auth/login');
    } catch (error: any) {
      console.error('Register error:', error);
      
      if (error.response?.status === 400) {
        const message = error.response.data.message;
        if (message.includes('email')) {
          setRegisterError('Este email ya está registrado. Usa otro email o inicia sesión.');
        } else {
          setRegisterError(message || 'Datos inválidos. Verifica la información.');
        }
      } else if (error.code === 'NETWORK_ERROR') {
        setRegisterError('Error de conexión. Verifica tu conexión a internet.');
      } else {
        setRegisterError('Error inesperado. Inténtalo de nuevo más tarde.');
      }
    }
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (pwd.length >= 6) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    const levels = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Muy débil', color: 'bg-red-500' },
      { score: 2, label: 'Débil', color: 'bg-orange-500' },
      { score: 3, label: 'Regular', color: 'bg-yellow-500' },
      { score: 4, label: 'Fuerte', color: 'bg-green-500' },
      { score: 5, label: 'Muy fuerte', color: 'bg-green-600' },
    ];

    return levels[Math.min(score, 5)];
  };

  const passwordStrength = getPasswordStrength(password || '');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <UserPlus className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Crear nueva cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                {...register('name')}
                type="text"
                placeholder="Nombre completo"
                className="pl-10"
                error={errors.name?.message}
                autoComplete="name"
              />
            </div>

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
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                {...register('role')}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value={Role.USER}>Paciente</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
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
                autoComplete="new-password"
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

            {password && passwordStrength.score > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Seguridad de contraseña:</span>
                  <span className={`font-medium ${
                    passwordStrength.score >= 4 ? 'text-green-600' : 
                    passwordStrength.score >= 3 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar contraseña"
                className="pl-10 pr-10"
                error={errors.confirmPassword?.message}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {registerError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{registerError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Acepto los{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                términos y condiciones
              </Link>
              {' '}y la{' '}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                política de privacidad
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-sm text-green-800">
                Tu información está protegida con encriptación de nivel empresarial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}