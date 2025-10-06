import { prisma } from "../../../../../../lib/prisma";
import { requireAuthJWT } from "../../../../../../lib/auth-jwt";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuthJWT(req);
    if (authResult instanceof Response) return authResult;

    const { userId, role } = authResult;
    const { id: sessionId } = await params;

    const body = await req.json();
    const { 
      delayBetweenSteps = 1000, 
      skipDelays = false,
      reason = "Flujo automático completo",
      notes = "Sesión procesada automáticamente"
    } = body;

    const existingSession = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        therapist: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!existingSession) {
      return new Response(
        JSON.stringify({ error: "Sesión no encontrada" }),
        { status: 404 }
      );
    }

    const canExecute = 
      userId === existingSession.therapistId || 
      role === "ADMIN"; 

    if (!canExecute) {
      return new Response(
        JSON.stringify({ 
          error: "Solo el terapeuta asignado o un administrador pueden ejecutar el flujo completo",
          sessionTherapist: existingSession.therapistId,
          yourId: userId,
          yourRole: role
        }),
        { status: 403 }
      );
    }

    const currentStatus = (existingSession as any).status || "PENDING";
    
    if (currentStatus !== "PENDING") {
      return new Response(
        JSON.stringify({
          error: "Solo se puede ejecutar el flujo completo desde estado PENDING",
          currentStatus: currentStatus,
          sessionId: sessionId
        }),
        { status: 400 }
      );
    }

    const flowSteps = [];
    let currentStep = "PENDING";

    const createStatusLog = async (fromStatus: string, toStatus: string, stepReason: string) => {
      try {
        const logId = Math.random().toString(36).substring(2, 15);
        await prisma.$executeRaw`
          INSERT INTO session_status_logs (id, "sessionId", "fromStatus", "toStatus", "changedBy", reason, notes, "createdAt")
          VALUES (${logId}, ${sessionId}, ${fromStatus}::"SessionStatus", ${toStatus}::"SessionStatus", ${userId}, ${stepReason}, ${notes}, NOW())
        `;
        return logId;
      } catch (error) {
        console.log("Error creating log:", error);
        return "log_error";
      }
    };

    const updateSessionStatus = async (newStatus: string) => {
      try {
        await prisma.$executeRaw`
          UPDATE "Session" 
          SET "status" = ${newStatus}::"SessionStatus"
          WHERE "id" = ${sessionId}
        `;
      } catch (error) {
        console.log("Error updating status:", error);
        throw error;
      }
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    console.log(`🚀 Iniciando flujo automático para sesión ${sessionId}...`);

    console.log("📝 Paso 1: PENDING → CONFIRMED");
    await updateSessionStatus("CONFIRMED");
    const logId1 = await createStatusLog("PENDING", "CONFIRMED", `${reason} - Paso 1: Confirmación automática`);
    
    flowSteps.push({
      step: 1,
      from: "PENDING",
      to: "CONFIRMED",
      logId: logId1,
      timestamp: new Date().toISOString(),
      description: "Sesión confirmada automáticamente"
    });
    
    currentStep = "CONFIRMED";
    
    if (!skipDelays) await delay(delayBetweenSteps);

    console.log("🎯 Paso 2: CONFIRMED → IN_PROGRESS");
    await updateSessionStatus("IN_PROGRESS");
    const logId2 = await createStatusLog("CONFIRMED", "IN_PROGRESS", `${reason} - Paso 2: Inicio automático`);
    
    flowSteps.push({
      step: 2,
      from: "CONFIRMED",
      to: "IN_PROGRESS",
      logId: logId2,
      timestamp: new Date().toISOString(),
      description: "Sesión iniciada automáticamente"
    });
    
    currentStep = "IN_PROGRESS";
    
    if (!skipDelays) await delay(delayBetweenSteps);

    console.log("✅ Paso 3: IN_PROGRESS → COMPLETED");
    await updateSessionStatus("COMPLETED");
    const logId3 = await createStatusLog("IN_PROGRESS", "COMPLETED", `${reason} - Paso 3: Finalización automática`);
    
    flowSteps.push({
      step: 3,
      from: "IN_PROGRESS",
      to: "COMPLETED",
      logId: logId3,
      timestamp: new Date().toISOString(),
      description: "Sesión completada automáticamente"
    });

    const updatedSession = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        therapist: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    console.log(`🎉 Flujo completo ejecutado para sesión ${sessionId}`);

    return new Response(
      JSON.stringify({
        message: "Flujo completo ejecutado exitosamente",
        session: updatedSession,
        flowExecution: {
          startTime: flowSteps[0]?.timestamp,
          endTime: flowSteps[flowSteps.length - 1]?.timestamp,
          totalSteps: flowSteps.length,
          executedBy: userId,
          executedByRole: role,
          finalStatus: "COMPLETED"
        },
        steps: flowSteps,
        summary: {
          startedFrom: "PENDING",
          completedIn: "COMPLETED",
          stepsExecuted: [
            "PENDING → CONFIRMED",
            "CONFIRMED → IN_PROGRESS", 
            "IN_PROGRESS → COMPLETED"
          ],
          totalTime: `${flowSteps.length * (skipDelays ? 0 : delayBetweenSteps)}ms`,
        },
        notifications: {
          shouldNotifyUser: true,
          shouldNotifyTherapist: false,
          shouldUpdateCalendar: true,
          message: "Sesión completada automáticamente"
        },
        nextActions: [
          "La sesión está ahora en estado final COMPLETED",
          "Se pueden revisar los logs con GET /api/sessions/" + sessionId + "/logs",
          "El slot de tiempo ya no está disponible para nuevas reservas"
        ]
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (err: any) {
    console.error("Error en flujo automático:", err);
    return new Response(
      JSON.stringify({ 
        error: "Error interno del servidor durante el flujo automático",
        details: err.message,
        step: "Error durante ejecución"
      }),
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuthJWT(req);
    if (authResult instanceof Response) return authResult;

    const { userId, role } = authResult;
    const { id: sessionId } = await params;

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        therapist: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Sesión no encontrada" }),
        { status: 404 }
      );
    }

    const canView = 
      userId === session.userId || 
      userId === session.therapistId || 
      role === "ADMIN";

    if (!canView) {
      return new Response(
        JSON.stringify({ error: "No tienes permisos para ver esta sesión" }),
        { status: 403 }
      );
    }

    const currentStatus = (session as any).status || "PENDING";
    const canExecuteFlow = 
      (userId === session.therapistId || role === "ADMIN") && 
      currentStatus === "PENDING";

    return new Response(
      JSON.stringify({
        session: {
          id: session.id,
          currentStatus: currentStatus,
          user: session.user,
          therapist: session.therapist,
          date: session.date
        },
        flowInfo: {
          canExecute: canExecuteFlow,
          currentStatus: currentStatus,
          requiredRole: "THERAPIST o ADMIN",
          requiredStatus: "PENDING",
          flowSteps: [
            { step: 1, transition: "PENDING → CONFIRMED", description: "Confirmación automática" },
            { step: 2, transition: "CONFIRMED → IN_PROGRESS", description: "Inicio automático" },
            { step: 3, transition: "IN_PROGRESS → COMPLETED", description: "Finalización automática" }
          ]
        },
        usage: {
          endpoint: `POST /api/sessions/${sessionId}/auto-complete`,
          requiredHeaders: ["Authorization: Bearer <token>", "Content-Type: application/json"],
          optionalBody: {
            delayBetweenSteps: "Delay en ms entre pasos (default: 1000)",
            skipDelays: "true para ejecución instantánea (default: false)", 
            reason: "Razón personalizada (default: 'Flujo automático completo')",
            notes: "Notas adicionales (default: 'Sesión procesada automáticamente')"
          },
          example: {
            delayBetweenSteps: 500,
            skipDelays: false,
            reason: "Test del flujo completo",
            notes: "Ejecutado desde Postman"
          }
        }
      }),
      { status: 200 }
    );

  } catch (err: any) {
    console.error("Error al obtener info de flujo automático:", err);
    return new Response(
      JSON.stringify({ 
        error: "Error interno del servidor",
        details: err.message 
      }),
      { status: 500 }
    );
  }
}