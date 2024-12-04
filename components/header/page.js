import { FiLogOut } from "react-icons/fi"; // Paket react-icons untuk ikon logout

export default function Header({ username, onLogout }) {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md flex items-center justify-between">
      {/* Judul Dashboard */}
      <h1 className="text-xl font-bold">Dashboard Admin</h1>

      {/* Bagian kanan: Username dan ikon logout */}
      <div className="flex items-center gap-4">
        <p className="text-sm">
          Halo, <span className="font-semibold">{username}</span>
        </p>
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-red-200 hover:text-red-400"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
