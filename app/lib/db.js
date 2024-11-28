const { Pool } = require('pg');  // Ganti menggunakan require

const pool = new Pool({
  user: 'postgres',       // Ganti dengan username Anda
  host: 'localhost',
  database: 'db_app',  // Ganti dengan nama database Anda
  password: '555555',  // Ganti dengan password Anda
  port: 5432,
});


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error koneksi ke database:', err);
    } else {
      console.log('Koneksi berhasil:', res.rows);
    }
  });

module.exports = pool;  // Ganti export default dengan module.exports
