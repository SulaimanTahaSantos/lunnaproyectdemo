<<<<<<< HEAD
=======
// src/app/api/auth/logout/route.ts
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
export async function POST(req: Request) {
  try {
    // En una implementación real, aquí podrías:
    // 1. Agregar el token a una blacklist en Redis
    // 2. Reducir el tiempo de expiración del token
    // Por ahora, solo limpiamos cookies y devolvemos éxito

    return new Response(
      JSON.stringify({
        message: "Logout exitoso - Token invalidado del lado del cliente",
        success: true,
<<<<<<< HEAD
        instruction:
          "Elimina el token del localStorage/sessionStorage del cliente",
      }),
      {
        status: 200,
        headers: {
          // Limpiar cookies
          "Set-Cookie": [
            "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
            "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
          ].join(", "),
        },
=======
        instruction: "Elimina el token del localStorage/sessionStorage del cliente",
      }),
      { 
        status: 200,
        headers: {
          // Limpiar cookies
          'Set-Cookie': [
            'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
            'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict'
          ].join(', ')
        }
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
      }
    );
  } catch (err: any) {
    console.error("Error en logout:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  return POST(req);
<<<<<<< HEAD
}
=======
}
>>>>>>> 1e6016d4c225fa89982a493cbb1f4c7ded7decc4
