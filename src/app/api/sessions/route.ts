<<<<<<< HEAD
=======
// src/app/api/sessions/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    if (!userId) {
<<<<<<< HEAD
      return new Response(JSON.stringify({ error: "userId es requerido" }), {
        status: 400,
      });
=======
      return new Response(
        JSON.stringify({ error: "userId es requerido" }),
        { status: 400 }
      );
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    }

    let sessions;

    if (role === "THERAPIST") {
      // Si es terapeuta, obtener sesiones donde es el terapeuta
      sessions = await prisma.session.findMany({
        where: { therapistId: userId },
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
          therapist: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
        orderBy: { date: "asc" },
      });
    } else {
      // Si es usuario, obtener sesiones donde es el usuario
      sessions = await prisma.session.findMany({
        where: { userId },
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
          therapist: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
        orderBy: { date: "asc" },
      });
    }

    return new Response(JSON.stringify(sessions), { status: 200 });
  } catch (err: any) {
    console.error("Error al obtener sesiones:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
