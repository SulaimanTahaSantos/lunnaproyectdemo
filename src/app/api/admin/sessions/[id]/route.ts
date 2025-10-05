import { prisma } from "../../../../../../lib/prisma";
import { requireAdmin } from "../../../../../../lib/auth-admin";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const session = await prisma.session.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        therapist: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Sesión no encontrada" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ session }), { status: 200 });
  } catch (err: any) {
    console.error("Error al obtener sesión:", err);
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
    const { date, therapistId, reason } = body;

    const existingSession = await prisma.session.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { name: true, email: true } },
        therapist: { select: { name: true, email: true } },
      },
    });

    if (!existingSession) {
      return new Response(
        JSON.stringify({ error: "Sesión no encontrada" }),
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (date) {
      const sessionDate = new Date(date);
      if (sessionDate < new Date()) {
        return new Response(
          JSON.stringify({ 
            error: "No se puede programar sesión en el pasado",
            providedDate: sessionDate 
          }),
          { status: 400 }
        );
      }
      updateData.date = sessionDate;
    }

    if (therapistId) {
      const therapist = await prisma.user.findUnique({
        where: { id: therapistId },
        select: { id: true, name: true, role: true },
      });

      if (!therapist) {
        return new Response(
          JSON.stringify({ error: "Terapeuta no encontrado" }),
          { status: 404 }
        );
      }

    const allowedRoles = ["THERAPIST", "ADMIN"];
    if (!allowedRoles.includes(therapist.role)) {
      return new Response(
        JSON.stringify({ 
          error: "El usuario seleccionado no es un terapeuta",
          userRole: therapist.role,
          allowedRoles: allowedRoles
        }),
        { status: 400 }
      );
    }      updateData.therapistId = therapistId;
    }

    const updatedSession = await prisma.session.update({
      where: { id: params.id },
      data: updateData,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        therapist: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return new Response(
      JSON.stringify({
        message: "Sesión actualizada exitosamente",
        session: updatedSession,
        changes: updateData,
        updatedBy: adminUser.userId,
        adminNote: reason || "Actualizada por administrador",
        previousState: {
          date: existingSession.date,
          therapist: existingSession.therapist.name,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al actualizar sesión:", err);
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

    const url = new URL(req.url);
    const reason = url.searchParams.get("reason") || "";

    const existingSession = await prisma.session.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { name: true, email: true } },
        therapist: { select: { name: true, email: true } },
      },
    });

    if (!existingSession) {
      return new Response(
        JSON.stringify({ error: "Sesión no encontrada" }),
        { status: 404 }
      );
    }

    await prisma.session.delete({
      where: { id: params.id },
    });

    return new Response(
      JSON.stringify({
        message: "Sesión eliminada exitosamente",
        deletedSession: {
          id: params.id,
          date: existingSession.date,
          user: existingSession.user.name,
          therapist: existingSession.therapist.name,
        },
        deletedBy: adminUser.userId,
        adminNote: reason || "Eliminada por administrador",
        deletedAt: new Date().toISOString(),
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al eliminar sesión:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}