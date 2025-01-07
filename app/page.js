"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Arahkan ke halaman login
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Placeholder untuk sementara */}
      <p className="text-gray-600 text-lg">Mengalihkan ke halaman login...</p>
    </div>
  );
}
