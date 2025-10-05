import { prisma } from "../../../../../../lib/prisma";
import { requireAdmin, requireAdminOrSelf } from "../../../../../../lib/auth-admin";
import { hash } from "bcryptjs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdminOrSelf(req, params.id);
    if (adminUser instanceof Response) return adminUser;

    const user = await prisma.user.findUnique({
      where: { id: params.id },
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
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    if (adminUser.role !== "ADMIN" && adminUser.userId === params.id) {
      return new Response(JSON.stringify({ user }), { status: 200 });
    }

    const sessions = await prisma.session.findMany({
      where: {
        OR: [
          { userId: params.id },
          { therapistId: params.id }
        ]
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        therapist: { select: { id: true, name: true, email: true } },
      },
      orderBy: { date: "desc" },
      take: 10,
    });

    return new Response(
      JSON.stringify({
        user,
        recentSessions: sessions,
        isAdmin: true,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al obtener usuario:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const body = await req.json();
    const { name, email, role, password, image } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });
      if (emailExists) {
        return new Response(
          JSON.stringify({ error: "El email ya está en uso" }),
          { status: 409 }
        );
      }
    }

    const updateData: any = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role && ["USER", "THERAPIST", "ADMIN"].includes(role)) {
      updateData.role = role;
    }
    if (image !== undefined) updateData.image = image;
    if (password) {
      updateData.password = await hash(password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
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
        message: "Usuario actualizado exitosamente",
        user: updatedUser,
        updatedBy: adminUser.userId,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al actualizar usuario:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    if (params.id === adminUser.userId) {
      return new Response(
        JSON.stringify({ error: "No puedes eliminar tu propia cuenta" }),
        { status: 400 }
      );
    }

    await prisma.session.deleteMany({
      where: {
        OR: [
          { userId: params.id },
          { therapistId: params.id }
        ]
      }
    });

    await prisma.user.delete({
      where: { id: params.id },
    });

    return new Response(
      JSON.stringify({
        message: "Usuario eliminado exitosamente",
        deletedUser: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        },
        deletedBy: adminUser.userId,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al eliminar usuario:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}