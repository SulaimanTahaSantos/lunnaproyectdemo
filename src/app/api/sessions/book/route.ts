<<<<<<< HEAD
=======
// src/app/api/sessions/book/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
import { prisma } from "../../../../../lib/prisma";
import { createMeeting, createAttendee } from "../../../../../lib/awsChime";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { therapistId, userId } = body;

<<<<<<< HEAD
=======
    // Validar que tenemos los datos necesarios
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    if (!therapistId || !userId) {
      return new Response(
        JSON.stringify({ error: "therapistId y userId son requeridos" }),
        { status: 400 }
      );
    }

<<<<<<< HEAD
=======
    // Verificar que los usuarios existen
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    const therapist = await prisma.user.findUnique({
      where: { id: therapistId, role: "THERAPIST" },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId, role: "USER" },
    });

    if (!therapist) {
      return new Response(
<<<<<<< HEAD
        JSON.stringify({
          error: `Therapist con ID ${therapistId} no encontrado`,
        }),
=======
        JSON.stringify({ error: `Therapist con ID ${therapistId} no encontrado` }),
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
        { status: 404 }
      );
    }

    if (!user) {
      return new Response(
        JSON.stringify({ error: `Usuario con ID ${userId} no encontrado` }),
        { status: 404 }
      );
    }

<<<<<<< HEAD
    console.log("Creando meeting con ID:", `meeting-${Date.now()}`);
    const meeting = await createMeeting(`meeting-${Date.now()}`);

    console.log("Meeting creado:", meeting);

=======
    // Crear reunión en AWS Chime
    console.log("Creando meeting con ID:", `meeting-${Date.now()}`);
    const meeting = await createMeeting(`meeting-${Date.now()}`);
    
    console.log("Meeting creado:", meeting);

    // Verificar que el meeting fue creado correctamente
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    if (!meeting || !meeting.MeetingId) {
      throw new Error("No se pudo crear la reunión en AWS Chime");
    }

<<<<<<< HEAD
=======
    // Crear participantes
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    const therapistAttendee = await createAttendee(
      meeting.MeetingId,
      therapistId
    );
    const userAttendee = await createAttendee(meeting.MeetingId, userId);

<<<<<<< HEAD
=======
    // Guardar en la base de datos
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
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
