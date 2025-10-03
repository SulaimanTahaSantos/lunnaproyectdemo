<<<<<<< HEAD
=======
// src/app/api/auth/register/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
import { prisma } from "../../../../../lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    // Validaciones
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Nombre, email y contraseña son requeridos" }),
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return new Response(
<<<<<<< HEAD
        JSON.stringify({
          error: "La contraseña debe tener al menos 6 caracteres",
        }),
=======
        JSON.stringify({ error: "La contraseña debe tener al menos 6 caracteres" }),
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "El email ya está registrado" }),
        { status: 409 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 12);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "USER", // Por defecto USER
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Usuario creado exitosamente",
        user,
      }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error al crear usuario:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
