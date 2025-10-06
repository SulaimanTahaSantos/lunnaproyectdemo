import { prisma } from "../../../../../lib/prisma";
import { requireAuthJWT } from "../../../../../lib/auth-jwt";

export async function GET(req: Request) {
  try {
    const authResult = await requireAuthJWT(req);
    if (authResult instanceof Response) return authResult;

    const { userId, role } = authResult;

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const status = url.searchParams.get("status") || "";
    const search = url.searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    let whereClause: any = {};
    
    switch (role) {
      case "USER":
        whereClause = { userId: userId };
        break;
        
      case "THERAPIST":
        whereClause = { therapistId: userId };
        break;
        
      case "ADMIN":
        whereClause = {};
        break;
        
      default:
        return new Response(
          JSON.stringify({ 
            error: "Rol no válido",
            role: role,
            allowedRoles: ["USER", "THERAPIST", "ADMIN"]
          }),
          { status: 403 }
        );
    }

    if (search) {
      whereClause.OR = [
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

    const [sessions, totalSessions] = await Promise.all([
      prisma.session.findMany({
        where: whereClause,
        include: {
          user: {
            select: { id: true, name: true, email: true, role: true, image: true },
          },
          therapist: {
            select: { id: true, name: true, email: true, role: true, image: true },
          },
        },
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      prisma.session.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalSessions / limit);

    const sessionsData = sessions.map((session: any) => {
      const baseSession = {
        id: session.id,
        date: session.date,
        chimeLink: session.chimeLink,
      };

      switch (role) {
        case "USER":
          return {
            ...baseSession,
            therapist: {
              id: session.therapist.id,
              name: session.therapist.name,
              image: session.therapist.image,
            },
            myRole: "patient",
          };
          
        case "THERAPIST":
          return {
            ...baseSession,
            patient: {
              id: session.user.id,
              name: session.user.name,
              image: session.user.image,
            },
            myRole: "therapist",
          };
          
        case "ADMIN":
          return {
            ...baseSession,
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
            myRole: "admin",
          };
          
        default:
          return baseSession;
      }
    });

    return new Response(
      JSON.stringify({
        sessions: sessionsData,
        userInfo: {
          id: userId,
          role: role,
          perspective: role === "USER" ? "patient" : role === "THERAPIST" ? "therapist" : "admin",
        },
        pagination: {
          page,
          limit,
          totalSessions,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        filters: {
          search: search || null,
          status: status || null,
        },
        summary: {
          totalSessionsForRole: totalSessions,
          currentPageCount: sessions.length,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al obtener sesiones del usuario:", err);
    return new Response(
      JSON.stringify({ 
        error: "Error interno del servidor",
        details: err.message 
      }),
      { status: 500 }
    );
  }
}