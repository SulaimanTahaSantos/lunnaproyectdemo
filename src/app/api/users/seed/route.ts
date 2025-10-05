import { prisma } from "../../../../../lib/prisma";

export async function POST() {
  try {
    const therapist = await prisma.user.create({
      data: {
        name: "Dr. Ana García",
        email: "therapist@test.com",
        password: "password123", 
        role: "THERAPIST",
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "Juan Pérez",
        email: "user@test.com",
        password: "password123", 
        role: "USER",
      },
    });

    return new Response(
      JSON.stringify({
        message: "Usuarios de prueba creados exitosamente",
        users: { therapist, user },
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al crear usuarios de prueba:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
