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
  const [activeContent, setActiveContent] = useState("/dashboard"); // Default ke dashboard
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

  

  return (
    <div className="min-h-screen flex flex-col">      
        <Content
          fullName={user?.full_name}
          role={user?.role}
          activeContent={activeContent}
        />      
    </div>
  );
}
