import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // Mengimpor useState
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Ikon untuk tanda panah

export default function Menu({ onLogout }) {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(null); // Untuk menyimpan menu yang aktif

  // Fungsi untuk membuka/menutup menu
  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-white text-gray-800 p-4 shadow-lg">
      <ul>
        {/* Menu Dashboard */}
        <li
          className={`mb-4 ${pathname === "/dashboard" ? "font-bold" : ""}`}
        >
          <button
            onClick={() => toggleMenu("Dashboard")}
            className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
          >
            <span className="font-semibold">Dashboard</span>
          </button>
        </li>

        {/* Menu Perusahaan */}
        <li>
          <button
            onClick={() => toggleMenu("Perusahaan")}
            className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
          >
            <span className="font-semibold">Perusahaan</span>
            {activeMenu === "Perusahaan" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`ml-4 mt-2 transition-all duration-500 ease-in-out transform ${
              activeMenu === "Perusahaan" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <ul>
              <li>
                <Link href="/dashboard/konsumen" className="block py-2 px-4 hover:bg-blue-100">
                  Konsumen
                </Link>
              </li>
              <li>
                <Link href="/dashboard/pemasok" className="block py-2 px-4 hover:bg-blue-100">
                  Pemasok
                </Link>
              </li>
              <li>
                <Link href="/dashboard/karyawan" className="block py-2 px-4 hover:bg-blue-100">
                  Karyawan
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Menu Buku Besar */}
        <li>
          <button
            onClick={() => toggleMenu("Buku Besar")}
            className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
          >
            <span className="font-semibold">Buku Besar</span>
            {activeMenu === "Buku Besar" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`ml-4 mt-2 transition-all duration-500 ease-in-out transform ${
              activeMenu === "Buku Besar" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <ul>
              <li>
                <Link href="/dashboard/akun-perkiraan" className="block py-2 px-4 hover:bg-blue-100">
                  Akun Perkiraan
                </Link>
              </li>
              <li>
                <Link href="/dashboard/pencatatan-gaji" className="block py-2 px-4 hover:bg-blue-100">
                  Pencatatan Gaji
                </Link>
              </li>
              <li>
                <Link href="/dashboard/jurnal-umum" className="block py-2 px-4 hover:bg-blue-100">
                  Jurnal Umum
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Menu Kas Bank */}
        <li>
          <button
            onClick={() => toggleMenu("Kas Bank")}
            className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
          >
            <span className="font-semibold">Kas Bank</span>
            {activeMenu === "Kas Bank" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`ml-4 mt-2 transition-all duration-500 ease-in-out transform ${
              activeMenu === "Kas Bank" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <ul>
              <li>
                <Link href="/dashboard/pembayaran" className="block py-2 px-4 hover:bg-blue-100">
                  Pembayaran
                </Link>
              </li>
              <li>
                <Link href="/dashboard/penerimaan" className="block py-2 px-4 hover:bg-blue-100">
                  Penerimaan
                </Link>
              </li>
              <li>
                <Link href="/dashboard/transfer-bank" className="block py-2 px-4 hover:bg-blue-100">
                  Transfer Bank
                </Link>
              </li>
              <li>
                <Link href="/dashboard/giro" className="block py-2 px-4 hover:bg-blue-100">
                  Giro
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Menu Pengaturan */}
        <li>
          <button
            onClick={() => toggleMenu("Pengaturan")}
            className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
          >
            <span className="font-semibold">Pengaturan</span>
            {activeMenu === "Pengaturan" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`ml-4 mt-2 transition-all duration-500 ease-in-out transform ${
              activeMenu === "Pengaturan" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <ul>
              <li>
                <Link href="/dashboard/akses-group" className="block py-2 px-4 hover:bg-blue-100">
                  Akses Group
                </Link>
              </li>
              <li>
                <Link href="/dashboard/pengaturan-pengguna" className="block py-2 px-4 hover:bg-blue-100">
                  Pengaturan Pengguna
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Menu Laporan */}
        <li>
          <button
            onClick={() => toggleMenu("Laporan")}
            className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
          >
            <span className="font-semibold">Laporan</span>
            {activeMenu === "Laporan" ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={`ml-4 mt-2 transition-all duration-500 ease-in-out transform ${
              activeMenu === "Laporan" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <ul>
              <li>
                <Link href="/dashboard/rekap-konsumen" className="block py-2 px-4 hover:bg-blue-100">
                  Rekap Konsumen
                </Link>
              </li>
              <li>
                <Link href="/dashboard/rekap-pemasok" className="block py-2 px-4 hover:bg-blue-100">
                  Rekap Pemasok
                </Link>
              </li>
              <li>
                <Link href="/dashboard/rekap-penjualan" className="block py-2 px-4 hover:bg-blue-100">
                  Rekap Penjualan
                </Link>
              </li>
              <li>
                <Link href="/dashboard/rekap-pembelian" className="block py-2 px-4 hover:bg-blue-100">
                  Rekap Pembelian
                </Link>
              </li>
              <li>
                <Link href="/dashboard/rekap-pembayaran-customer" className="block py-2 px-4 hover:bg-blue-100">
                  Rekap Pembayaran Customer
                </Link>
              </li>
              <li>
                <Link href="/dashboard/rekap-pembayaran-pemasok" className="block py-2 px-4 hover:bg-blue-100">
                  Rekap Pembayaran Pemasok
                </Link>
              </li>
            </ul>
          </div>
        </li>

        {/* Logout Button */}
        <li className="mt-4">
          <button
            className="text-red-500 hover:text-red-700"
            onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
