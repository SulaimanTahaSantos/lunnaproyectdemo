import { prisma } from "../../../../../../../lib/prisma";
import { requireAdmin } from "../../../../../../../lib/auth-admin";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const body = await req.json();
    const { role, reason } = body;

    if (!role) {
      return new Response(
        JSON.stringify({ error: "Rol es requerido" }),
        { status: 400 }
      );
    }

    if (!["USER", "THERAPIST", "ADMIN"].includes(role)) {
      return new Response(
        JSON.stringify({ error: "Rol inválido. Debe ser USER, THERAPIST o ADMIN" }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    if (params.id === adminUser.userId && role !== "ADMIN") {
      return new Response(
        JSON.stringify({ 
          error: "No puedes cambiar tu propio rol de administrador",
          currentRole: "ADMIN",
          attemptedRole: role 
        }),
        { status: 400 }
      );
    }

    if (existingUser.role === role) {
      return new Response(
        JSON.stringify({ 
          message: "El usuario ya tiene ese rol",
          user: existingUser 
        }),
        { status: 200 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: { role },
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
        message: `Rol cambiado exitosamente de ${existingUser.role} a ${role}`,
        user: updatedUser,
        changeLog: {
          previousRole: existingUser.role,
          newRole: role,
          reason: reason || "Sin razón especificada",
          changedBy: adminUser.userId,
          changedAt: new Date().toISOString(),
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al cambiar rol:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        user,
        currentRole: user.role,
        message: "Para implementar historial completo, considera agregar una tabla de auditoría",
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al obtener historial de roles:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}