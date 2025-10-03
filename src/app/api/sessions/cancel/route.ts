// src/app/api/sessions/cancel/route.ts
import { prisma } from "../../../../../lib/prisma";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, userId } = body;

    if (!sessionId || !userId) {
      return new Response(
        JSON.stringify({ error: "sessionId y userId son requeridos" }),
        { status: 400 }
      );
    }

    // Verificar que la sesión existe y pertenece al usuario
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
        therapist: true,
      },
    });

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Sesión no encontrada" }),
        { status: 404 }
      );
    }

    // Verificar que el usuario tiene permiso para cancelar
    if (session.userId !== userId && session.therapistId !== userId) {
      return new Response(
        JSON.stringify({ error: "No tienes permiso para cancelar esta sesión" }),
        { status: 403 }
      );
    }

    // Eliminar la sesión
    await prisma.session.delete({
      where: { id: sessionId },
    });

    return new Response(
      JSON.stringify({
        message: "Sesión cancelada exitosamente",
        sessionId,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al cancelar sesión:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}