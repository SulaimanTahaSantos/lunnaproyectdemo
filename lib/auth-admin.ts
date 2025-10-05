import { requireAuthJWT } from "./auth-jwt";

export async function requireAdmin(req: Request) {
  const authResult = await requireAuthJWT(req);
  
  if (authResult instanceof Response) {
    return authResult;
  }

  if (authResult.role !== "ADMIN") {
    return new Response(
      JSON.stringify({ 
        error: "Acceso denegado. Se requiere rol de administrador.",
        requiredRole: "ADMIN",
        currentRole: authResult.role 
      }),
      { status: 403 }
    );
  }

  return authResult;
}

export async function requireAdminOrSelf(req: Request, targetUserId: string) {
  const authResult = await requireAuthJWT(req);
  
  if (authResult instanceof Response) {
    return authResult;
  }

  if (authResult.role === "ADMIN" || authResult.userId === targetUserId) {
    return authResult;
  }

  return new Response(
    JSON.stringify({ 
      error: "Acceso denegado. Solo administradores o el propio usuario pueden realizar esta acción.",
      requiredRole: "ADMIN o propio usuario",
      currentRole: authResult.role 
    }),
    { status: 403 }
  );
}