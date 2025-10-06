import { prisma } from "../../../../../lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const therapistId = url.searchParams.get("therapistId");
    const dateParam = url.searchParams.get("date");

    if (!therapistId) {
      return new Response(
        JSON.stringify({ 
          error: "therapistId es requerido",
          example: "/api/therapists/availability?therapistId=123&date=2025-12-20"
        }),
        { status: 400 }
      );
    }

    if (!dateParam) {
      return new Response(
        JSON.stringify({ 
          error: "date es requerido (formato: YYYY-MM-DD)",
          example: "/api/therapists/availability?therapistId=123&date=2025-12-20"
        }),
        { status: 400 }
      );
    }

    const targetDate = new Date(dateParam);
    if (isNaN(targetDate.getTime())) {
      return new Response(
        JSON.stringify({ 
          error: "Formato de fecha inválido. Use YYYY-MM-DD",
          received: dateParam
        }),
        { status: 400 }
      );
    }

    const therapist = await prisma.user.findUnique({
      where: { 
        id: therapistId,
        role: "THERAPIST"
      },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        image: true 
      },
    });

    if (!therapist) {
      return new Response(
        JSON.stringify({ 
          error: "Terapeuta no encontrado o no tiene rol THERAPIST",
          therapistId: therapistId
        }),
        { status: 404 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(targetDate);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      return new Response(
        JSON.stringify({ 
          error: "No se puede consultar disponibilidad de fechas pasadas",
          requestedDate: dateParam,
          currentDate: today.toISOString().split('T')[0]
        }),
        { status: 400 }
      );
    }

    const workingHours = [
      "09:00", "10:00", "11:00", "12:00", 
      "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingSessions = await prisma.session.findMany({
      where: {
        therapistId: therapistId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        user: {
          select: { id: true, name: true, image: true }
        }
      },
      orderBy: { date: "asc" },
    });

    const occupiedSlots = new Set<string>();
    const sessionDetails: Record<string, any> = {};

    existingSessions.forEach(session => {
      const sessionTime = session.date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      
      occupiedSlots.add(sessionTime);
      sessionDetails[sessionTime] = {
        sessionId: session.id,
        patientName: session.user.name,
        patientImage: session.user.image,
        chimeLink: session.chimeLink
      };
    });

    const availabilitySlots = workingHours.map(time => {
    const isOccupied = occupiedSlots.has(time);
      
      return {
        time: time,
        available: !isOccupied,
        status: isOccupied ? "occupied" : "available",
        session: isOccupied ? sessionDetails[time] : null,
        bookingUrl: !isOccupied ? 
          `/api/sessions/book?therapistId=${therapistId}&time=${time}&date=${dateParam}` : 
          null
      };
    });

    const totalSlots = workingHours.length;
    const occupiedCount = occupiedSlots.size;
    const availableCount = totalSlots - occupiedCount;

    return new Response(
      JSON.stringify({
        therapist: {
          id: therapist.id,
          name: therapist.name,
          email: therapist.email,
          image: therapist.image,
        },
        date: dateParam,
        dayOfWeek: targetDate.toLocaleDateString('es-ES', { weekday: 'long' }),
        availability: {
          slots: availabilitySlots,
          summary: {
            totalSlots: totalSlots,
            availableSlots: availableCount,
            occupiedSlots: occupiedCount,
            occupancyRate: Math.round((occupiedCount / totalSlots) * 100),
            availabilityRate: Math.round((availableCount / totalSlots) * 100)
          }
        },
        workingHours: {
          start: "09:00",
          end: "18:00",
          timezone: "UTC",
          sessionDuration: "60 minutes"
        },
        metadata: {
          generatedAt: new Date().toISOString(),
          isToday: checkDate.getTime() === today.getTime(),
          daysFromNow: Math.ceil((checkDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        }
      }),
      { 
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache" 
        }
      }
    );

  } catch (err: any) {
    console.error("Error al obtener disponibilidad:", err);
    return new Response(
      JSON.stringify({ 
        error: "Error interno del servidor",
        details: err.message,
        timestamp: new Date().toISOString()
      }),
      { status: 500 }
    );
  }
}
