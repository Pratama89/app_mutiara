import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ valid: false, message: "Token tidak ditemukan." }), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ valid: false, message: "Token tidak valid." }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);  // Verifikasi token
    return new Response(JSON.stringify({ valid: true, user: decoded }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ valid: false, message: "Token tidak valid." }), {
      status: 401,
    });
  }
}
