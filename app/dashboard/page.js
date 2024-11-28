"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Untuk menyoroti menu aktif

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null untuk loading state
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname(); // Mendapatkan path aktif

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      fetch("/api/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            router.push("/login");
          }
        })
        .catch(() => {
          setError("Terjadi kesalahan saat memeriksa autentikasi.");
        });
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Memeriksa autentikasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Dashboard Admin</h1>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4 shadow-lg">
          <ul>
            <li className={`mb-4 ${pathname === "/dashboard" ? "font-bold" : ""}`}>
              <Link href="/dashboard" className="hover:text-blue-300">
                Dashboard
              </Link>
            </li>
            <li className={`mb-4 ${pathname === "/dashboard/users" ? "font-bold" : ""}`}>
              <Link href="/dashboard/users" className="hover:text-blue-300">
                Kelola Pengguna
              </Link>
            </li>
            <li className={`mb-4 ${pathname === "/dashboard/settings" ? "font-bold" : ""}`}>
              <Link href="/dashboard/settings" className="hover:text-blue-300">
                Pengaturan
              </Link>
            </li>
            <li>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold mb-4">Selamat Datang, Admin!</h2>
          <div className="bg-white shadow p-4 rounded-lg">
            <p>Gunakan menu di sebelah kiri untuk mengelola aplikasi.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
