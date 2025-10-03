import { prisma } from "../../../../../lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email y contraseña son requeridos" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
        status: 401,
      });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
        status: 401,
      });
    }

    const secretKey = process.env.NEXTAUTH_SECRET || "fallback-secret-key";

    const token = sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        iat: Math.floor(Date.now() / 1000), 
      },
      secretKey,
      {
        expiresIn: "24h",
        issuer: "lunna-platform",
        subject: user.id,
      }
    );

    return new Response(
      JSON.stringify({
        message: "Login exitoso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        token,
        expiresIn: "24h",
        tokenType: "Bearer",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
        },
      }
    );
  } catch (err: any) {
    console.error("Error en login:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
