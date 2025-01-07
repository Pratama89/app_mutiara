export default function FormTambahKonsumen({ onSubmit, onClose }) {
  const [newKonsumen, setNewKonsumen] = useState({
    nama: "",
    alamat: "",
    kota: "",
    no_telpon: "",
    email: "",
    tipe_pelanggan: "",
    syarat_pembayaran: "", // Tipe untuk syarat pembayaran
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKonsumen((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newKonsumen);
  };

  const handleReset = () => {
    setNewKonsumen({
      nama: "",
      alamat: "",
      kota: "",
      no_telpon: "",
      email: "",
      tipe_pelanggan: "",
      syarat_pembayaran: "",
    });
    onClose(); // Menutup modal setelah reset
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form input fields */}
      <div className="mb-4">
        <label className="block mb-2">Nama Konsumen</label>
        <input
          type="text"
          name="nama"
          value={newKonsumen.nama}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      {/* Other input fields */}
      <div className="mb-4">
        <label className="block mb-2">Syarat Pembayaran</label>
        <select
          name="syarat_pembayaran"
          value={newKonsumen.syarat_pembayaran}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="30 hari">30 Hari</option>
          <option value="Cash">Cash</option>
          <option value="60 hari">60 Hari</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Tambah
        </button>
        <button
          type="button"
          onClick={handleReset} // Menggunakan fungsi reset terpisah
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
