<<<<<<< HEAD
=======
// src/app/api/sessions/cancel/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
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
<<<<<<< HEAD
      return new Response(JSON.stringify({ error: "Sesión no encontrada" }), {
        status: 404,
      });
=======
      return new Response(
        JSON.stringify({ error: "Sesión no encontrada" }),
        { status: 404 }
      );
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    }

    // Verificar que el usuario tiene permiso para cancelar
    if (session.userId !== userId && session.therapistId !== userId) {
      return new Response(
<<<<<<< HEAD
        JSON.stringify({
          error: "No tienes permiso para cancelar esta sesión",
        }),
=======
        JSON.stringify({ error: "No tienes permiso para cancelar esta sesión" }),
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
