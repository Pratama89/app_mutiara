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
      // Format data pengguna sesuai dengan skema database
      const formattedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name, // Map dari 'full_name'
        role: user.role,
        profilePicture: user.profile_picture,
      };

      // Buat token otentikasi dengan menyertakan properti yang relevan
      const token = jwt.sign(
        {
          userId: formattedUser.id,
          username: formattedUser.username,
          fullName: formattedUser.fullName,
          role: formattedUser.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Kembalikan token dan data user
      return NextResponse.json({
        message: "Login berhasil",
        token,
        user: formattedUser,
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
