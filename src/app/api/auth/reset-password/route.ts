import { NextResponse } from 'next/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Datos recibidos:', body);
    const { token, password } = resetPasswordSchema.parse(body);

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json(
        { message: 'Token inválido o expirado' },
        { status: 400 }
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!resetToken) {
      return NextResponse.json(
        { message: 'Token no encontrado' },
        { status: 404 }
      );
    }

    if (resetToken.used) {
      return NextResponse.json(
        { message: 'Este token ya ha sido utilizado' },
        { status: 400 }
      );
    }

    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { message: 'Token expirado' },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    });

    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    });

    return NextResponse.json(
      { message: 'Contraseña actualizada exitosamente' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error en reset-password:', error);
    
    if (error instanceof z.ZodError) {
      console.log('Error de validación Zod:', error.issues);
      return NextResponse.json(
        { 
          message: `Invalid input: ${error.issues[0].message}`,
          field: error.issues[0].path[0],
          issues: error.issues
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}