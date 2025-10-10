import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const body = await request.json();
    const { expiresInMinutes = 2 } = body;

    const payload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    const testToken = jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { 
        expiresIn: `${expiresInMinutes}m`,
        issuer: 'lunna-platform',
        audience: 'lunna-users'
      }
    );

    return NextResponse.json({
      message: `Token de prueba creado - expira en ${expiresInMinutes} minutos`,
      token: testToken,
      expiresIn: expiresInMinutes * 60, 
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      }
    });

  } catch (error) {
    console.error('Error creando token de prueba:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}