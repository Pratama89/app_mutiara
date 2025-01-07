export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Tidak tampilkan modal jika isOpen false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Tambah Konsumen</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        {children} {/* Konten modal di sini */}
      </div>
    </div>
  );
}
