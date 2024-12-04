import pool from "../../lib/db"; // Sesuaikan path ke db.js

export async function PATCH(req) {
  try {
    const { userId, newRole } = await req.json();

    if (!userId || !newRole) {
      return new Response(
        JSON.stringify({ message: "User ID dan Role baru harus diisi." }),
        { status: 400 }
      );
    }

    // Update role di database
    const result = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, role",
      [newRole, userId]
    );

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "User tidak ditemukan." }),
        { status: 404 }
      );
    }

    const updatedUser = result.rows[0];
    return new Response(
      JSON.stringify({
        message: "Role berhasil diubah.",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error mengubah role:", error.message);
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan." }),
      { status: 500 }
    );
  }
}
