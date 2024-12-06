import { FiLogOut } from "react-icons/fi"; // Paket react-icons untuk ikon logout

export default function Header({ username, onLogout }) {
  return (
    <header className="bg-blue-100 text-gray-800 p-4 shadow-lg flex items-center justify-between">
      {/* Judul Dashboard */}
      <h1 className="text-xl font-bold">Dashboard Admin</h1>

      {/* Bagian kanan: Username dan ikon logout */}
      <div className="flex items-center gap-4">
        <p className="text-sm">
          Halo, <span className="font-semibold">{username || "Pengguna"}</span>
        </p>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-2xl shadow hover:bg-red-600 transition duration-200"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
