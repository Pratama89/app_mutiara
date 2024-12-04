import pool from "../../lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT id, username, role FROM users");
    return new Response(JSON.stringify({ users: result.rows }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan." }),
      { status: 500 }
    );
  }
}
