import { PlusIcon } from "@heroicons/react/24/solid";

export default function HeaderActions({ onAdd, onExport, onImport }) {
  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={onExport}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Export Data
      </button>

      {/* Tombol Import Data */}
      <form onSubmit={onImport} className="flex items-center">
        <input
          type="file"
          onChange={onImport} // Menangani perubahan file
          className="border border-gray-300 p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Import Data
        </button>
      </form>

      <button
        onClick={onAdd}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        <PlusIcon className="h-5 w-5 inline-block" /> Tambah Konsumen
      </button>
    </div>
  );
}
