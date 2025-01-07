import pool from './db';  // Impor koneksi database

// Fungsi untuk mengambil semua data konsumen
export const getAllKonsumen = async () => {
  try {
    const result = await pool.query('SELECT * FROM konsumen');
    return result.rows;  // Mengembalikan data konsumen
  } catch (error) {
    console.error('Error fetching konsumen data:', error);
    throw new Error('Error fetching konsumen data');
  }
};

// Fungsi untuk mengambil data konsumen berdasarkan ID
export const getKonsumenById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM konsumen WHERE id = $1', [id]);
    return result.rows[0];  // Mengembalikan satu data konsumen
  } catch (error) {
    console.error('Error fetching konsumen by id:', error);
    throw new Error('Error fetching konsumen by id');
  }
};

// Fungsi untuk menambah data konsumen
export const addKonsumen = async (konsumen) => {
  const { nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran } = konsumen;
  try {
    const result = await pool.query(
      'INSERT INTO konsumen (nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran]
    );
    return result.rows[0];  // Mengembalikan data konsumen yang baru ditambahkan
  } catch (error) {
    console.error('Error adding konsumen:', error);
    throw new Error('Error adding konsumen');
  }
};

// Fungsi untuk mengedit data konsumen
export const updateKonsumen = async (id, konsumen) => {
  const { nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran } = konsumen;
  try {
    const result = await pool.query(
      'UPDATE konsumen SET nama = $1, alamat = $2, kota = $3, no_telpon = $4, email = $5, tipe_pelanggan = $6, syarat_pembayaran = $7 WHERE id = $8 RETURNING *',
      [nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran, id]
    );
    return result.rows[0];  // Mengembalikan data konsumen yang sudah diperbarui
  } catch (error) {
    console.error('Error updating konsumen:', error);
    throw new Error('Error updating konsumen');
  }
};

// Fungsi untuk menghapus data konsumen
export async function deleteKonsumen(id) {
  try {
    const result = await pool.query("DELETE FROM konsumen WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      console.log("Data tidak ditemukan di database:", id);
      return null; // Tidak ada data yang dihapus
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error deleting konsumen:", error);
    throw error;
  }
}

