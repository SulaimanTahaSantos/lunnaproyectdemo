import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: 'Token requerido' },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    } catch (error) {
      return NextResponse.json(
        { message: 'Token inválido o expirado' },
        { status: 400 }
      );
    }

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!passwordResetToken) {
      return NextResponse.json(
        { message: 'Token no encontrado en la base de datos' },
        { status: 400 }
      );
    }

    if (passwordResetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({
        where: { id: passwordResetToken.id }
      });

      return NextResponse.json(
        { message: 'El token ha expirado' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Token válido',
      email: passwordResetToken.user.email,
      expiresAt: passwordResetToken.expiresAt
    });

  } catch (error) {
    console.error('Error validando token:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}