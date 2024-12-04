export default function Content({ fullName, role, activeContent }) {
  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Selamat Datang, {fullName || "Pengguna"}!
            </h2>
            <p>Ini adalah halaman dashboard.</p>
          </div>
        );
      case "users":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Kelola Pengguna</h2>
            <p>Anda dapat mengelola pengguna di sini.</p>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Pengaturan</h2>
            <p>Ini adalah halaman pengaturan aplikasi.</p>
          </div>
        );
      default:
        return <p>Konten tidak ditemukan.</p>;
    }
  };

  return (
    <main className="flex-1 bg-gray-100 p-6">
      <div className="bg-white shadow p-4 rounded-lg">{renderContent()}</div>
    </main>
  );
}
