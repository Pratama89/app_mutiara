const pool = require("./db");
const bcrypt = require("bcryptjs");

async function registerUser({ username, email, password, fullName, role = 'Sales' }) {
  try {
    console.log("Mendaftarkan user:", username, email, fullName, role);

    // Cek apakah username atau email sudah digunakan
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      throw new Error("Username atau email sudah digunakan.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const result = await pool.query(
      "INSERT INTO users (username, email, password, full_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, fullName, role]
    );

    console.log("User berhasil didaftarkan:", result.rows[0]);

    // Mengubah properti full_name menjadi fullName
    const user = result.rows[0];
    const formattedUser = {
      ...user,
      fullName: user.full_name, // Pemetaan properti full_name ke fullName
    };

    delete formattedUser.full_name; // Menghapus properti full_name dari hasil akhir

    return formattedUser; // Mengembalikan user dengan properti fullName
  } catch (error) {
    console.error("Error pada registerUser:", error.message);
    throw error;
  }
}


async function checkCredentials(identifier, password) {
  try {
    // Cari pengguna berdasarkan username atau email
    const result = await pool.query(
      "SELECT id, username, full_name, role, password FROM users WHERE username = $1 OR email = $1",
      [identifier]
    );

    if (result.rows.length === 0) {
      console.log("User tidak ditemukan.");
      return null;
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password); // Verifikasi password

    if (isMatch) {
      // Kembalikan data pengguna tanpa password
      return {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        role: user.role,
      };
    } else {
      return null; // Password tidak cocok
    }
  } catch (error) {
    console.error("Error pada checkCredentials:", error.message);
    throw error;
  }
}



module.exports = { registerUser, checkCredentials };
