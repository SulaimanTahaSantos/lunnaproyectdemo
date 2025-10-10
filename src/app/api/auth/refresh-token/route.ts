import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        try {
          decoded = jwt.decode(token);
          if (!decoded) {
            return NextResponse.json(
              { message: 'Token inválido' },
              { status: 401 }
            );
          }
        } catch (decodeError) {
          return NextResponse.json(
            { message: 'Token inválido' },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json(
          { message: 'Token inválido' },
          { status: 401 }
        );
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    const newToken = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' } 
    );

    console.log(`Token refrescado para usuario: ${user.email}`);

    return NextResponse.json(
      {
        message: 'Token refrescado exitosamente',
        token: newToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}