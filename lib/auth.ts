import { getServerSession } from "next-auth";
import { authOptions } from "../src/app/auth/nextauth/route";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No autorizado");
  }
  return user;
}

export async function requireRole(requiredRole: string) {
  const user = await requireAuth();
  if ((user as any).role !== requiredRole) {
    throw new Error(`Rol ${requiredRole} requerido`);
  }
  return user;
}