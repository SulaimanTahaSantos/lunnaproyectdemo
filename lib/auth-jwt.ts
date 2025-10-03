import { verify, JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export function verifyJWT(token: string): UserPayload | null {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET || "fallback-secret-key";
    const decoded = verify(token, secretKey) as UserPayload;
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}

export async function requireAuthJWT(
  req: Request
): Promise<UserPayload | Response> {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Token de autorización requerido" }),
      { status: 401 }
    );
  }

  const token = extractTokenFromHeader(authHeader);
  if (!token) {
    return new Response(
      JSON.stringify({
        error: "Formato de token inválido. Use: Bearer <token>",
      }),
      { status: 401 }
    );
  }

  const user = verifyJWT(token);
  if (!user) {
    return new Response(
      JSON.stringify({ error: "Token inválido o expirado" }),
      { status: 401 }
    );
  }

  return user;
}
