"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Reset error message
  
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);  // Menyimpan token di localStorage
        router.push("/dashboard");  // Arahkan ke dashboard setelah login berhasil
      } else {
        setError(data.message);  // Menampilkan error dari server
      }
    } catch (error) {
      setError("Terjadi kesalahan, silakan coba lagi.");
    }
  };
  

  const handleRegister = () => {
    router.push("/register"); // Arahkan ke halaman register
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="identifier" className="block text-gray-700">
            Username atau Email
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Belum punya akun?</p>
          <button
            type="button"
            onClick={handleRegister}
            className="text-blue-500 hover:underline mt-2">
            Daftar di sini
          </button>
        </div>
      </form>
    </div>
  );
}

