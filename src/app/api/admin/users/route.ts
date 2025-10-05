import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/auth-admin";
import { hash } from "bcryptjs";

export async function GET(req: Request) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } }
      ];
    }
    
    if (role) {
      where.role = role;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          _count: {
            select: {
              sessions: true,
              therapistSessions: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.user.count({ where }),
    ]);

    return new Response(
      JSON.stringify({
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error al listar usuarios:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const adminUser = await requireAdmin(req);
    if (adminUser instanceof Response) return adminUser;

    const body = await req.json();
    const { name, email, password, role, image } = body;

    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: "Nombre, email, contraseña y rol son requeridos" }),
        { status: 400 }
      );
    }

    if (!["USER", "THERAPIST", "ADMIN"].includes(role)) {
      return new Response(
        JSON.stringify({ error: "Rol inválido. Debe ser USER, THERAPIST o ADMIN" }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "El email ya está registrado" }),
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        image: image || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Usuario creado exitosamente por administrador",
        user,
        createdBy: adminUser.userId,
      }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error al crear usuario:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}