import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";  // Import jsonwebtoken untuk membuat token
import { checkCredentials } from "../../lib/userController"; // Fungsi verifikasi kredensial

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    // Validasi input
    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Username/email dan password harus diisi!" },
        { status: 400 }
      );
    }

    // Cek kredensial
    const user = await checkCredentials(identifier, password);
    
    if (user) {
      // Buat token otentikasi (misalnya menggunakan JWT)
      const token = jwt.sign(
        { userId: user.id, username: user.username },  // Payload
        process.env.SECRET_KEY,  // SECRET_KEY yang diambil dari environment variables
        { expiresIn: "1h" }  // Token kedaluwarsa dalam 1 jam
      );
      return NextResponse.json({ message: "Login berhasil", token });
    } else {
      return NextResponse.json(
        { message: "Kredensial tidak valid" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan, silakan coba lagi." },
      { status: 500 }
    );
  }
}
