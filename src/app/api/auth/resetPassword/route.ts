import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {prisma} from '../../../../../lib/prisma';

const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: 'Token requerido' }),
  newPassword: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Debe tener mayúscula, minúscula y número',
    }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, newPassword } = resetPasswordSchema.parse(body);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const savedToken = await prisma.passwordResetToken.findFirst({
      where: { token },
    });

    if (!savedToken || savedToken.expiresAt < new Date()) {
      return NextResponse.json(
        { message: 'Token inválido o expirado' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json(
      { message: 'Contraseña actualizada correctamente' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error en reset-password:', error);
    return NextResponse.json(
      { message: 'Error al restablecer la contraseña' },
      { status: 500 }
    );
  }
}
