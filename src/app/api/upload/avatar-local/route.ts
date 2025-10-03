<<<<<<< HEAD
=======
// src/app/api/upload/avatar-local/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return new Response(
        JSON.stringify({ error: "Archivo y userId son requeridos" }),
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return new Response(
<<<<<<< HEAD
        JSON.stringify({
          error: "Tipo de archivo no permitido. Solo JPG, PNG, WEBP",
        }),
=======
        JSON.stringify({ error: "Tipo de archivo no permitido. Solo JPG, PNG, WEBP" }),
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return new Response(
        JSON.stringify({ error: "El archivo es demasiado grande. Máximo 5MB" }),
        { status: 400 }
      );
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
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

    // Convertir archivo a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Guardar localmente en public/uploads
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
<<<<<<< HEAD

=======
    
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    // Crear directorio si no existe
    const dir = path.dirname(filePath);
    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error("Error creating directory:", error);
      return new Response(
        JSON.stringify({ error: "Error al crear directorio" }),
        { status: 500 }
      );
    }

    // URL local
    const imageUrl = `/uploads/${fileName}`;

    // Actualizar URL de imagen en la base de datos
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Avatar subido exitosamente (almacenamiento local)",
        user: updatedUser,
        imageUrl,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al subir avatar:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
