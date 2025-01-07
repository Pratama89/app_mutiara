"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Redirect ke login jika token tidak ada
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
            setUser(data.user); // Simpan data user ke state
          } else {
            localStorage.removeItem("token");
            router.push("/login"); // Redirect ke login jika token tidak valid
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setIsAuthenticated(false);
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login"); // Logout dan redirect ke login
  };

  if (!isAuthenticated && !user) {
    return <p>Loading...</p>; // Tampilkan loading saat menunggu verifikasi
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-100 p-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Assalamualaikum, {user?.fullName || "Pengguna"}!
          </h2>
          <p>Selamat datang di halaman Dashboard.</p>
        </div>
      </main>
    </div>
  );
}
