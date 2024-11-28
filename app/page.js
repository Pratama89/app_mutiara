export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Kami Sedang Perbaikan
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Sebuah platform baru untuk kebutuhan tekstil Anda
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center">
        <p className="text-xl text-gray-700 mb-4">
          Kami sedang mempersiapkan sesuatu yang luar biasa untuk Anda!
        </p>
      </main>

      {/* Footer: Akan Tampil Segera */}
      <footer className="w-full text-center py-8 bg-gray-800 text-white">
        <p className="text-lg font-semibold">Akan Tampil Segera</p>
      </footer>
    </div>
  );
}
