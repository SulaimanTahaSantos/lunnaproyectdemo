import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/auth-admin";

export async function GET(req: Request) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const [
      totalUsers,
      totalSessions,
      usersByRole,
      allUsers,
      allSessions,
      sessionsByDate
    ] = await Promise.all([
      prisma.user.count(),

      prisma.session.count(),

      prisma.user.groupBy({
        by: ["role"],
        _count: {
          role: true,
        },
      }),

      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
        orderBy: { name: "asc" },
        take: 10,
      }),

      prisma.session.findMany({
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          therapist: {
            select: { id: true, name: true, email: true },
          },
        },
        orderBy: { date: "desc" },
        take: 10,
      }),

      prisma.session.findMany({
        select: {
          id: true,
          date: true,
        },
        orderBy: { date: "desc" },
      }),
    ]);

    const roleStats = usersByRole.reduce((acc, item) => {
      acc[item.role] = item._count.role;
      return acc;
    }, {} as Record<string, number>);

    const completeRoleStats = {
      USER: roleStats.USER || 0,
      THERAPIST: roleStats.THERAPIST || 0,
      ADMIN: roleStats.ADMIN || 0,
    };

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    
    const sessionsToday = sessionsByDate.filter(session => 
      session.date >= startOfDay && session.date <= endOfDay
    ).length;

    const monthlySessionStats = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth();

      const sessionsInMonth = sessionsByDate.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate.getFullYear() === year && sessionDate.getMonth() === month;
      }).length;

      return {
        month: `${year}-${String(month + 1).padStart(2, '0')}`,
        sessions: sessionsInMonth,
        monthName: date.toLocaleString('es', { month: 'long', year: 'numeric' })
      };
    }).reverse();

    const dashboardData = {
      overview: {
        totalUsers,
        totalSessions,
        sessionsToday,
        activeUsers: allUsers.length,
      },
      userStats: {
        byRole: completeRoleStats,
        recentUsers: allUsers.map(user => ({
          ...user,
          status: 'active', 
        })),
      },
      sessionStats: {
        recent: allSessions.map(session => ({
          id: session.id,
          date: session.date,
          userName: session.user.name,
          userEmail: session.user.email,
          therapistName: session.therapist.name,
          therapistEmail: session.therapist.email,
          chimeLink: session.chimeLink,
        })),
        monthly: monthlySessionStats,
      },
      systemInfo: {
        generatedAt: new Date().toISOString(),
        generatedBy: adminUser.userId,
        dataSource: "PostgreSQL via Prisma",
        schemaVersion: "1.0",
      },
    };

    return new Response(JSON.stringify(dashboardData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Error al obtener estadísticas del dashboard:", err);
    return new Response(
      JSON.stringify({ 
        error: "Error interno del servidor",
        details: err.message 
      }),
      { status: 500 }
    );
  }
}