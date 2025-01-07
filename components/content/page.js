import React from "react";

export default function Content({ fullName, activeContent }) {
  const renderContent = () => {
    if (activeContent === "/dashboard") {
      return (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Assalamualaikum, {fullName || "Pengguna"}!
          </h2>
          <p>Ini adalah halaman dashboard utama ya.</p>
        </div>
      );
    }
    return <p>Konten tidak ditemukan.</p>;
  };

  return (
    <main className="flex-1 bg-gray-100 p-2">
      <div className="bg-white shadow p-4 rounded-lg">{renderContent()}</div>
    </main>
  );
}
