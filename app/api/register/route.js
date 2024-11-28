import { NextResponse } from "next/server";
import { registerUser } from "../../lib/userController";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Validasi input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Semua kolom harus diisi!" },
        { status: 400 }
      );
    }

    // Panggil fungsi untuk menyimpan user
    const userId = await registerUser(username, email, password);
    return NextResponse.json({ message: "User berhasil didaftarkan!", userId });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mendaftarkan user: " + error.message },
      { status: 500 }
    );
  }
}
