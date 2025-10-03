// src/app/api/auth/me/route.ts
import { requireAuthJWT } from "../../../../../lib/auth-jwt";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    // Verificar JWT
    const authResult = await requireAuthJWT(req);
    
    // Si es una Response, significa que hay error de auth
    if (authResult instanceof Response) {
      return authResult;
    }

    // Obtener datos frescos del usuario desde la BD
    const user = await prisma.user.findUnique({
      where: { id: authResult.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        _count: {
          select: {
            sessions: true,
            therapistSessions: true,
          },
        },
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        user,
        tokenInfo: {
          userId: authResult.userId,
          email: authResult.email,
          role: authResult.role,
          iat: authResult.iat,
          exp: authResult.exp,
          iss: authResult.iss,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error en /me:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}