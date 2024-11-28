import bcrypt from "bcryptjs";
import pool from "../../lib/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, email, password } = req.body;

        try {
            // Validasi input
            if (!username || !email || !password) {
                return res.status(400).json({ message: "Semua field harus diisi!" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Simpan ke database
            const result = await pool.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, hashedPassword]
            );

            res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
        } catch (error) {
            console.error(error);
            if (error.code === "23505") { // Error kode untuk data duplikat di PostgreSQL
                return res.status(409).json({ message: "Email atau username sudah digunakan!" });
            }
            res.status(500).json({ message: "Error registering user" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
