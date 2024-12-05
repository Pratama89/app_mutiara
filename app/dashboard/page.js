"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/header/page";
import Menu from "../../components/menu/page";
import Content from "../../components/content/page";
import Image from "next/image";


export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [activeContent, setActiveContent] = useState("dashboard"); // State untuk konten aktif
  const router = useRouter();

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
            setUser(data.user);
          } else {
            localStorage.removeItem("token");
            router.push("/login");
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
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Logo dan Animasi */}
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

  // if (isAuthenticated === null) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <div className="flex flex-col items-center">
  //         <Lottie animationData={loadingAnimation} style={{ width: 150, height: 150 }} />
  //         <p className="mt-4 text-blue-500 text-sm">Memeriksa autentikasi...</p>
  //       </div>
  //     </div>
  //   );
  // }
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header username={user?.username} onLogout={handleLogout} />
      <div className="flex flex-1">
        <Menu onLogout={handleLogout} setActiveContent={setActiveContent} />
        <Content
          fullName={user?.full_name}
          role={user?.role}
          activeContent={activeContent} // Kirim konten aktif ke Content
        />
      </div>
    </div>
  );
}

