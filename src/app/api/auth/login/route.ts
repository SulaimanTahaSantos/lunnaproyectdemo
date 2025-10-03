// src/app/api/auth/login/route.ts
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

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
<<<<<<< HEAD
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
        status: 401,
      });
=======
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas" }),
        { status: 401 }
      );
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    }

    // Verificar contraseña
    const isValid = await compare(password, user.password);
    if (!isValid) {
<<<<<<< HEAD
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), {
        status: 401,
      });
=======
      return new Response(
        JSON.stringify({ error: "Credenciales inválidas" }),
        { status: 401 }
      );
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
    }

    // Crear token JWT
    const secretKey = process.env.NEXTAUTH_SECRET || "fallback-secret-key";
<<<<<<< HEAD

    const token = sign(
      {
=======
    
    const token = sign(
      { 
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        iat: Math.floor(Date.now() / 1000), // Issued at
      },
      secretKey,
<<<<<<< HEAD
      {
=======
      { 
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
        expiresIn: "24h", // Token expira en 24 horas
        issuer: "lunna-platform",
        subject: user.id,
      }
    );

    // Login exitoso con JWT
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
<<<<<<< HEAD
      {
        status: 200,
        headers: {
          // Opcional: También establecer como cookie httpOnly
          "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
        },
=======
      { 
        status: 200,
        headers: {
          // Opcional: También establecer como cookie httpOnly
          'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`
        }
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
      }
    );
  } catch (err: any) {
    console.error("Error en login:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
