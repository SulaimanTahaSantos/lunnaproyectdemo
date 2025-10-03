import { prisma } from "../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId es requerido" }), {
        status: 400,
      });
    }

    let sessions;

    if (role === "THERAPIST") {
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
}
