"'use server'"
import { NextResponse } from 'next/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Email inválido' }),
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;

    try {
      await transporter.sendMail({
        from: `"Lunna Platform" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Restablece tu contraseña - Lunna Platform',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; text-align: center;">🌙 Restablecer contraseña</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p>Hola,</p>
              <p>Recibimos una solicitud para restablecer tu contraseña en Lunna Platform.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Restablecer Contraseña
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px;">
                O copia y pega este enlace en tu navegador:<br>
                <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
              </p>
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>Importante:</strong> Este enlace expirará en 15 minutos por seguridad.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
              <p>Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
              <p>© 2025 Lunna Platform. Todos los derechos reservados.</p>
            </div>
          </div>
        `,
      });
      
      console.log('Correo enviado exitosamente a:', email);
    } catch (emailError: any) {
      console.error('Error enviando correo:', emailError);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(' URL de reseteo (development):', resetUrl);
        return NextResponse.json(
          { 
            message: 'Correo enviado (development mode)',
            resetUrl 
          },
          { status: 200 }
        );
      }
      
      throw new Error('Error al enviar el correo electrónico');
    }

    return NextResponse.json({ message: 'Correo enviado' }, { status: 200 });
  } catch (error: any) {
    console.error('Error en forgot-password:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
