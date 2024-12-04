import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { checkCredentials } from "../../lib/userController";

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();
    console.log("Data yang diterima:", { identifier, password });

    if (!identifier || !password) {
      return NextResponse.json(
        { message: "Username/email dan password harus diisi!" },
        { status: 400 }
      );
    }

    // Verifikasi kredensial
    const user = await checkCredentials(identifier, password);

    if (user) {
      // Buat token otentikasi dengan menyertakan role
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          fullName: user.fullName,
          role: user.role, // Tambahkan role di token
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" } // Token berlaku selama 1 jam
      );

      // Kembalikan token dan data user
      return NextResponse.json({
        message: "Login berhasil",
        token,
        user,
      });
    } else {
      return NextResponse.json(
        { message: "Kredensial tidak valid" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error pada login handler:", error.message);
    return NextResponse.json(
      { message: "Terjadi kesalahan, silakan coba lagi." },
      { status: 500 }
    );
  }
}
