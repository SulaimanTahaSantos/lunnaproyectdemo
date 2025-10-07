import { z } from 'zod';
import { Role, SessionStatus } from '@/types';

export const loginSchema = z.object({
  email: z.email('Email inválido')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .min(1, 'Contraseña es requerida'),
});

export const registerSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  email:
    z.email('Email inválido')
    .min(1, 'Email es requerido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string()
    .min(1, 'Confirmación de contraseña es requerida'),
  role: z.enum(Role).optional().default(Role.USER),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const createSessionSchema = z.object({
  userId: z.string()
    .min(1, 'Usuario es requerido'),
  therapistId: z.string()
    .min(1, 'Terapeuta es requerido'),
  date: z.string()
    .min(1, 'Fecha es requerida')
    .refine((date) => {
      const selectedDate = new Date(date);
      const now = new Date();
      return selectedDate > now;
    }, 'La fecha debe ser futura'),
});

export const updateSessionStatusSchema = z.object({
  status: z.enum(SessionStatus),
  reason: z.string()
    .min(3, 'La razón debe tener al menos 3 caracteres')
    .max(200, 'La razón no puede tener más de 200 caracteres')
    .optional(),
  notes: z.string()
    .max(500, 'Las notas no pueden tener más de 500 caracteres')
    .optional(),
});

export const updateProfileSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  email: z.email('Email inválido'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(1, 'Contraseña actual es requerida'),
  newPassword: z.string()
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmNewPassword: z.string()
    .min(1, 'Confirmación de contraseña es requerida'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmNewPassword'],
});

export const searchSchema = z.object({
  query: z.string().min(1, 'Término de búsqueda requerido'),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
});

export const adminCreateUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(Role),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type CreateSessionForm = z.infer<typeof createSessionSchema>;
export type UpdateSessionStatusForm = z.infer<typeof updateSessionStatusSchema>;
export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
export type SearchForm = z.infer<typeof searchSchema>;
export type AdminCreateUserForm = z.infer<typeof adminCreateUserSchema>;