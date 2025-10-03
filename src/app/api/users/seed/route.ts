<<<<<<< HEAD
=======
// src/app/api/users/seed/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
import { prisma } from "../../../../../lib/prisma";

export async function POST() {
  try {
    // Crear usuarios de prueba
    const therapist = await prisma.user.create({
      data: {
        name: "Dr. Ana García",
        email: "therapist@test.com",
        password: "password123", // En producción esto debería estar hasheado
        role: "THERAPIST",
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "Juan Pérez",
        email: "user@test.com",
        password: "password123", // En producción esto debería estar hasheado
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
