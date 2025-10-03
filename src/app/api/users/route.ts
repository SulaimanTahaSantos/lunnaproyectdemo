import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener usuarios:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
