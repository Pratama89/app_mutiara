import ManagerUsers from "@/app/dashboard/pengaturan-pengguna/ManagerUsers";
import React from "react";
import Link from "next/link";

export default function Content({ fullName, role, activeContent }) {
  const renderContent = () => {
    switch (activeContent) {
      case "/dashboard":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Selamat Datang, {fullName || "Pengguna"}!
            </h2>
            <p>Ini adalah halaman dashboard utama.</p>
          </div>
        );
      case "/dashboard/pengaturan-pengguna":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Pengaturan Pengguna</h2>
            {/* Render komponen ManagerUsers */}
            <ManagerUsers />
          </div>
        );
      case "/dashboard/konsumen":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data Konsumen</h2>
            <p>Ini adalah halaman data konsumen.</p>
          </div>
        );
      case "/dashboard/pemasok":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data Pemasok</h2>
            <p>Ini adalah halaman data pemasok.</p>
          </div>
        );
      case "/dashboard/po-penjualan":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">PO Penjualan</h2>
            <p>Ini adalah halaman PO Penjualan.</p>
          </div>
        );
      case "/dashboard/pembelian":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Data Pembelian</h2>
            <p>Ini adalah halaman data pembelian.</p>
          </div>
        );
      case "/dashboard/return-penjualan":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Return Penjualan</h2>
            <p>Ini adalah halaman return penjualan.</p>
          </div>
        );
      case "/dashboard/rekap-penjualan":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Rekap Penjualan</h2>
            <p>Ini adalah halaman rekap penjualan.</p>
          </div>
        );
      // Tambahkan case lainnya sesuai dengan path yang ada
      default:
        return <p>Konten tidak ditemukan.</p>;
    }
  };

  return (
    <main className="flex-1 bg-gray-100 p-2">
      <div className="bg-white shadow p-4 rounded-lg">{renderContent()}</div>
    </main>
  );
}
