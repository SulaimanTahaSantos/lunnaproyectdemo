// src/app/api/sessions/book/route.ts
import { prisma } from "../../../../../lib/prisma";
import { createMeeting, createAttendee } from "../../../../../lib/awsChime";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { therapistId, userId } = body;

    // Validar que tenemos los datos necesarios
    if (!therapistId || !userId) {
      return new Response(
        JSON.stringify({ error: "therapistId y userId son requeridos" }),
        { status: 400 }
      );
    }

    // Verificar que los usuarios existen
    const therapist = await prisma.user.findUnique({
      where: { id: therapistId, role: "THERAPIST" },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId, role: "USER" },
    });

    if (!therapist) {
      return new Response(
        JSON.stringify({ error: `Therapist con ID ${therapistId} no encontrado` }),
        { status: 404 }
      );
    }

    if (!user) {
      return new Response(
        JSON.stringify({ error: `Usuario con ID ${userId} no encontrado` }),
        { status: 404 }
      );
    }

    // Crear reunión en AWS Chime
    console.log("Creando meeting con ID:", `meeting-${Date.now()}`);
    const meeting = await createMeeting(`meeting-${Date.now()}`);
    
    console.log("Meeting creado:", meeting);

    // Verificar que el meeting fue creado correctamente
    if (!meeting || !meeting.MeetingId) {
      throw new Error("No se pudo crear la reunión en AWS Chime");
    }

    // Crear participantes
    const therapistAttendee = await createAttendee(
      meeting.MeetingId,
      therapistId
    );
    const userAttendee = await createAttendee(meeting.MeetingId, userId);

    // Guardar en la base de datos
    const session = await prisma.session.create({
      data: {
        therapistId,
        userId,
        chimeLink: meeting.MeetingId,
        date: new Date(),
      },
    });

    return new Response(
      JSON.stringify({
        session,
        meeting,
        attendees: { therapistAttendee, userAttendee },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error en book session:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
