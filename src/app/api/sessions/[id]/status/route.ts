import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';
import { requireAuthJWT } from '../../../../../../lib/auth-jwt';
import { SessionStatus } from '@prisma/client';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAuthJWT(request);
    if (authResult instanceof NextResponse || authResult instanceof Response) {
      return authResult;
    }
    const { userId, role } = authResult;

    const sessionId = params.id;
    const body = await request.json();
    const { status, reason, notes } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'El estado es requerido' },
        { status: 400 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Sesión no encontrada' },
        { status: 404 }
      );
    }

    const canUpdate = 
      session.therapistId === userId ||
      role === 'ADMIN';

    if (!canUpdate) {
      return NextResponse.json(
        { error: 'Solo el terapeuta puede actualizar esta sesión' },
        { status: 403 }
      );
    }

    const validStatuses: SessionStatus[] = ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Estado inválido' },
        { status: 400 }
      );
    }

    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: {
        status,
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

    try {
      await prisma.sessionStatusLog.create({
        data: {
          sessionId,
          fromStatus: session.status,
          toStatus: status,
          changedBy: userId,
          reason: reason || undefined,
          notes: notes || undefined,
        },
      });
    } catch (error) {
      console.log('SessionStatusLog table might not exist:', error);
    }

    return NextResponse.json({ 
      message: 'Estado actualizado correctamente',
      session: updatedSession 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating session status:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar el estado de la sesión' },
      { status: 500 }
    );
  }
}
