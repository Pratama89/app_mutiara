import jwt from "jsonwebtoken";
import pool from "../../lib/db";

export async function POST(req) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ valid: false, message: "Token tidak ditemukan." }),
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return new Response(
        JSON.stringify({ valid: false, message: "Token tidak valid." }),
        { status: 401 }
      );
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Pastikan user masih valid di database
    const result = await pool.query(
      "SELECT id, username, full_name, role FROM users WHERE id = $1",
      [decoded.userId]
    );

    const user = result.rows[0];
    if (user) {
      return new Response(
        JSON.stringify({ valid: true, user }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ valid: false, message: "User tidak ditemukan." }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error pada verifikasi token:", error.message);
    return new Response(
      JSON.stringify({ valid: false, message: "Token tidak valid." }),
      { status: 401 }
    );
  }
}
