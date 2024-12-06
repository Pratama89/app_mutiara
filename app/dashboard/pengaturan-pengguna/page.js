// app/dashboard/pengaturan-pengguna/page.js
import ManagerUsers from "../../../app/dashboard/pengaturan-pengguna/ManagerUsers";

export default function PengaturanPenggunaPage() {
  return (
    <div className="bg-blue-100 shadow p-4 rounded-lg">
      <h2>Pengaturan Pengguna Baru</h2>
      <ManagerUsers />
    </div>
  );
}
