"use client";

import { useState, useEffect } from "react";

export default function ManagerUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data pengguna dari API (sesuaikan endpoint)
    fetch("/api/get-users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const response = await fetch("/api/update-role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Role berhasil diubah menjadi ${data.user.role}`);
        // Perbarui role di state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: data.user.role } : user
          )
        );
      } else {
        setMessage(data.message || "Gagal mengubah role.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan.");
    }
  };

  return (
    <div >
      <h2 className="text-xl font-semibold">Kelola Pengguna</h2>
      {message && <p className="text-green-500">{message}</p>}
      <table className="w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Username</th>
            <th className="border border-gray-200 p-2">Role</th>
            <th className="border border-gray-200 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-200 p-2">{user.id}</td>
              <td className="border border-gray-200 p-2">{user.username}</td>
              <td className="border border-gray-200 p-2">{user.role}</td>
              <td className="border border-gray-200 p-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
