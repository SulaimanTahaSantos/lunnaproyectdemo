import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/auth-admin";
import { createMeeting, createAttendee } from "../../../../../lib/awsChime";

export async function GET(req: Request) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";
    const userId = url.searchParams.get("userId") || "";
    const therapistId = url.searchParams.get("therapistId") || "";

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        {
          user: {
            name: { contains: search, mode: "insensitive" },
          },
        },
        {
          user: {
            email: { contains: search, mode: "insensitive" },
          },
        },
        {
          therapist: {
            name: { contains: search, mode: "insensitive" },
          },
        },
      ];
    }

    if (userId) {
      where.userId = userId;
    }

    if (therapistId) {
      where.therapistId = therapistId;
    }

    const [sessions, totalSessions] = await Promise.all([
      prisma.session.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, role: true },
          },
          therapist: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      prisma.session.count({ where }),
    ]);

    const totalPages = Math.ceil(totalSessions / limit);

    return new Response(
      JSON.stringify({
        sessions: sessions.map(session => ({
          id: session.id,
          date: session.date,
          chimeLink: session.chimeLink,
          user: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
          },
          therapist: {
            id: session.therapist.id,
            name: session.therapist.name,
            email: session.therapist.email,
            role: session.therapist.role,
          },
        })),
        pagination: {
          page,
          limit,
          totalSessions,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        filters: {
          search,
          userId,
          therapistId,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al obtener sesiones:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const body = await req.json();
    const { userId, therapistId, date, reason } = body;

    if (!userId || !therapistId || !date) {
      return new Response(
        JSON.stringify({
          error: "userId, therapistId y date son requeridos",
          received: { userId: !!userId, therapistId: !!therapistId, date: !!date },
        }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Usuario no encontrado" }),
        { status: 404 }
      );
    }

    const therapist = await prisma.user.findUnique({
      where: { id: therapistId },
      select: { id: true, name: true, email: true, role: true },
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
    }

    const sessionDate = new Date(date);
    if (sessionDate < new Date()) {
      return new Response(
        JSON.stringify({ 
          error: "No se pueden crear sesiones en el pasado",
          providedDate: sessionDate,
          currentDate: new Date()
        }),
        { status: 400 }
      );
    }

    console.log("Admin creando meeting con ID:", `admin-meeting-${Date.now()}`);
    const meeting = await createMeeting(`admin-meeting-${Date.now()}`);

    if (!meeting || !meeting.MeetingId) {
      return new Response(
        JSON.stringify({ 
          error: "No se pudo crear la reunión en AWS Chime",
          details: "Error al generar el meeting"
        }),
        { status: 500 }
      );
    }

    const [userAttendee, therapistAttendee] = await Promise.all([
      createAttendee(meeting.MeetingId, userId),
      createAttendee(meeting.MeetingId, therapistId),
    ]);

    if (!userAttendee || !therapistAttendee) {
      return new Response(
        JSON.stringify({ 
          error: "No se pudieron crear los attendees en AWS Chime",
          userAttendee: !!userAttendee,
          therapistAttendee: !!therapistAttendee
        }),
        { status: 500 }
      );
    }

    const newSession = await prisma.session.create({
      data: {
        userId,
        therapistId,
        date: sessionDate,
        chimeLink: `chime://meeting?meetingId=${meeting.MeetingId}&userAttendeeId=${userAttendee.AttendeeId}&therapistAttendeeId=${therapistAttendee.AttendeeId}`,
      },
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
        message: "Sesión creada exitosamente por administrador con AWS Chime",
        session: newSession,
        chimeDetails: {
          meetingId: meeting.MeetingId,
          userAttendeeId: userAttendee.AttendeeId,
          therapistAttendeeId: therapistAttendee.AttendeeId,
          joinInfo: meeting.MediaPlacement,
        },
        createdBy: adminUser.userId,
        adminNote: reason || "Creada por administrador",
        timestamp: new Date().toISOString(),
      }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error al crear sesión como admin:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}