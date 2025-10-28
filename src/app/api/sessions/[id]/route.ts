import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { requireAuthJWT } from '../../../../../lib/auth-jwt';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const authResult = await requireAuthJWT(request);
    if (authResult instanceof NextResponse || authResult instanceof Response) {
      return authResult;
    }
    const { userId, role } = authResult;

    const sessionId = params.id;

    // Buscar la sesión
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        therapist: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no encontrada' },
        { status: 404 }
      );
    }

    // Verificar que el usuario tenga acceso a esta sesión
    const hasAccess = 
      session.userId === userId || 
      session.therapistId === userId ||
      role === 'ADMIN';

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'No tienes permiso para ver esta sesión' },
        { status: 403 }
      );
    }

    return NextResponse.json({ session }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching session:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener la sesión' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const authResult = await requireAuthJWT(request);
    if (authResult instanceof NextResponse || authResult instanceof Response) {
      return authResult;
    }
    const { userId, role } = authResult;

    const sessionId = params.id;
    const body = await request.json();

    // Buscar la sesión
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no encontrada' },
        { status: 404 }
      );
    }

    // Verificar permisos (solo terapeuta o admin pueden actualizar)
    const canUpdate = 
      session.therapistId === userId ||
      role === 'ADMIN';

    if (!canUpdate) {
      return NextResponse.json(
        { error: 'Solo el terapeuta puede actualizar esta sesión' },
        { status: 403 }
      );
    }

    // Actualizar la sesión
    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: {
        ...body,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        therapist: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ session: updatedSession }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating session:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar la sesión' },
      { status: 500 }
    );
  }
}
