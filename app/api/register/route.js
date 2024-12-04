import { NextResponse } from "next/server";
import { registerUser } from "../../lib/userController";
 // Import fungsi dari userController

export async function POST(req) {
  try {
    // Parsing body dari request
    const body = await req.json();
    const { fullName, username, email, password } = body;
    console.log("Data diterima dari frontend:", body);

    // Validasi input
    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { message: "Semua kolom wajib diisi!" },
        { status: 400 }
      );
    }

    // Daftarkan user menggunakan fungsi modular
    const user = await registerUser({ fullName, username, email, password });

    // Kirim respons sukses
    return NextResponse.json({
      message: "Pendaftaran berhasil!",
      user,
    });
  } catch (error) {
    console.error("Error di API register:", error.message);
    return NextResponse.json(
      { message: error.message || "Terjadi kesalahan saat registrasi." },
      { status: 500 }
    );
  }
}
