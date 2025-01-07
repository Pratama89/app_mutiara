import pool from '@/lib/db';  // Mengimpor pool dari lib/db.js
import { parse } from 'json2csv';  // Install json2csv untuk mengonversi data menjadi CSV
import fs from 'fs';

export async function GET(request) {
  try {
    const result = await pool.query('SELECT * FROM konsumen');
    const konsumenData = result.rows;

    // Konversi data ke CSV menggunakan json2csv
    const csv = parse(konsumenData);

    // Simpan file CSV di server
    const filePath = './public/konsumen_data.csv';
    fs.writeFileSync(filePath, csv);

    // Kirim response dengan URL file
    return new Response(JSON.stringify({ message: 'Data exported successfully', filePath }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error exporting data' }), {
      status: 500,
    });
  }
}
