export async function POST(req: Request) {
  try {
    return new Response(
      JSON.stringify({
        message: "Logout exitoso - Token invalidado del lado del cliente",
        success: true,
        instruction:
          "Elimina el token del localStorage/sessionStorage del cliente",
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
            "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
          ].join(", "),
        },
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
}
