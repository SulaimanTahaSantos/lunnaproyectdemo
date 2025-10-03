<<<<<<< HEAD
=======
// src/app/api/auth/me/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
import { requireAuthJWT } from "../../../../../lib/auth-jwt";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    // Verificar JWT
    const authResult = await requireAuthJWT(req);
<<<<<<< HEAD

=======
    
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
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
<<<<<<< HEAD
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
      });
=======
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
