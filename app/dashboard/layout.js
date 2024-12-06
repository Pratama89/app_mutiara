"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/page";
import Menu from "@/components/menu/page";
import Image from "next/image";

export default function DashboardLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Jika token tidak ada, redirect ke halaman login
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
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
            router.push("/login"); // Jika token tidak valid, redirect ke login
          }
        })
        .catch(() => {
          console.error("Error verifying token");
          setIsAuthenticated(false);
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login"); // Logout dan redirect ke login
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <Image
            src="/Icon Mutiara serang.png"
            alt="Logo Mutiara Serang"
            width={100}
            height={100}
            className="w-20 h-20 mb-4 animate-bounce"
          />
          <p className="text-gray-500 text-xl">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header username={user?.username} onLogout={handleLogout} />
      <div className="flex flex-1">
        <Menu />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
