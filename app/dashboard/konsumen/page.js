"use client";

import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"; // Mengimpor ikon dari Heroicons
import FormTambahKonsumen from "./FormTambahKonsumen"; // Mengimpor FormTambahKonsumen jika dipisah

export default function KonsumenPage() {
  const [konsumen, setKonsumen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk modal tambah konsumen
  const [isEditMode, setIsEditMode] = useState(false); // Menandakan mode edit atau tambah
  const [currentKonsumen, setCurrentKonsumen] = useState(null); // Menyimpan data konsumen yang akan diedit

  // Ambil data konsumen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/konsumen");

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setKonsumen(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = async () => {
    const response = await fetch("/api/konsumen/export");

    if (response.ok) {
      const data = await response.json();
      const filePath = data.filePath;

      const link = document.createElement("a");
      link.href = filePath;
      link.download = "konsumen_data.csv";
      link.click();
    } else {
      alert("Failed to export data");
    }
  };

  const handleImport = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/konsumen/import", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Data imported successfully");
      window.location.reload();
    } else {
      alert("Failed to import data");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddKonsumen = (newKonsumen) => {
    fetch("/api/konsumen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newKonsumen),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Konsumen ditambahkan");
        setKonsumen([...konsumen, data]);
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error adding konsumen:", error));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus konsumen ini?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/konsumen?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Gagal menghapus data: ${response.statusText}`);
      }

      setKonsumen(konsumen.filter((item) => item.id !== id));
      alert("Konsumen berhasil dihapus");
    } catch (error) {
      console.error("Error deleting konsumen:", error);
      alert("Terjadi kesalahan saat menghapus konsumen");
    }
  };

  const handleEdit = (id) => {
    const konsumenToEdit = konsumen.find((item) => item.id === id);
    setCurrentKonsumen(konsumenToEdit);
    setIsEditMode(true); // Ubah mode menjadi edit
    setIsModalOpen(true); // Tampilkan modal
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Data Konsumen</h1>

      <div className="flex justify-between mb-4">
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export Data
        </button>

        <form onSubmit={handleImport} className="flex items-center">
          <input
            type="file"
            onChange={handleFileChange}
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
          onClick={() => {
            setIsEditMode(false); // Ubah mode menjadi tambah
            setCurrentKonsumen(null); // Reset data konsumen
            setIsModalOpen(true); // Tampilkan modal
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <PlusIcon className="h-5 w-5 inline-block" /> Tambah Konsumen
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Nama Konsumen</th>
              <th className="px-4 py-2">Alamat</th>
              <th className="px-4 py-2">No Telpon</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {konsumen.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2">{item.alamat}</td>
                <td className="px-4 py-2">{item.no_telpon}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <PencilIcon className="h-5 w-5 inline-block" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <TrashIcon className="h-5 w-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal untuk form tambah atau edit konsumen */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Konsumen" : "Tambah Konsumen"}
            </h2>
            <FormTambahKonsumen
              onSubmit={handleAddKonsumen}
              currentKonsumen={currentKonsumen} // Kirim data konsumen jika ada untuk edit
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
