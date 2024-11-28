const pool = require("./db");
const bcrypt = require("bcryptjs");

async function checkCredentials(identifier, password) {
  try {
    // Cari user berdasarkan username atau email
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $1",
      [identifier]
    );

    if (result.rows.length === 0) {
      return null; // User tidak ditemukan
    }

    const user = result.rows[0];

    // Cek password yang dimasukkan dengan yang tersimpan (hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user; // Kembali ke user jika password cocok
    } else {
      return null; // Password salah
    }
  } catch (error) {
    console.error("Error mengecek kredensial:", error.message);
    throw error;
  }
}

module.exports = { checkCredentials };
