import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const therapists = await prisma.user.findMany({
      where: { role: "THERAPIST" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        _count: {
          select: {
            therapistSessions: true, 
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return new Response(JSON.stringify(therapists), { status: 200 });
  } catch (err: any) {
    console.error("Error al obtener terapeutas:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
