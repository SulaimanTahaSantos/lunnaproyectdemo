import { requireAuthJWT } from "../../../../../lib/auth-jwt";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const authResult = await requireAuthJWT(req);
    if (authResult instanceof Response) {
      return authResult;
    }

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
      return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
        status: 404,
      });
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

export async function PUT(req: Request) {
  try {
    const authResult = await requireAuthJWT(req);
    if (authResult instanceof Response) {
      return authResult;
    }

    const body = await req.json();
    const { name, email, image } = body;

    if (!name || !name.trim()) {
      return new Response(
        JSON.stringify({ error: "El nombre es requerido" }),
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return new Response(
        JSON.stringify({ error: "El email es requerido" }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Formato de email inválido" }),
        { status: 400 }
      );
    }

    if (email !== authResult.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          id: { not: authResult.userId }
        }
      });

      if (existingUser) {
        return new Response(
          JSON.stringify({ error: "Este email ya está en uso" }),
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: authResult.userId },
      data: {
        name: name.trim(),
        email: email.trim(),
        ...(image !== undefined && { image })
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true
      }
    });

    return new Response(
      JSON.stringify({
        message: "Perfil actualizado correctamente",
        user: updatedUser
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al actualizar perfil:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}
