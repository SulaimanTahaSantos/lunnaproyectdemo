import { z } from 'zod';
import { Role } from '@/types';

export const loginSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
      .max(50, { message: 'El nombre no puede tener más de 50 caracteres' }),
    email: z.email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmación de contraseña es requerida' }),
    role: z.enum(Role),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
