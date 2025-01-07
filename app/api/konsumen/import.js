import pool from '@/lib/db';  // Mengimpor pool dari lib/db.js
import csvParser from 'csv-parser';
import fs from 'fs';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }

  const fileStream = file.stream();
  const results = [];

  return new Promise((resolve, reject) => {
    fileStream
      .pipe(csvParser())
      .on('data', (row) => results.push(row))
      .on('end', async () => {
        try {
          // Mengimpor data dari CSV ke PostgreSQL
          for (const row of results) {
            const { id, nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran } = row;

            await pool.query(
              'INSERT INTO konsumen(id, nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
              [id, nama, alamat, kota, no_telpon, email, tipe_pelanggan, syarat_pembayaran]
            );
          }

          resolve(new Response(JSON.stringify({ message: 'Data imported successfully' }), { status: 200 }));
        } catch (err) {
          reject(new Response(JSON.stringify({ error: 'Error importing data' }), { status: 500 }));
        }
      });
  });
}
