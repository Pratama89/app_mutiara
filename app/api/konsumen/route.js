import { getAllKonsumen, getKonsumenById, addKonsumen, updateKonsumen, deleteKonsumen } from '../../lib/konsumenController';


export async function GET(request) {
  try {
    const konsumen = await getAllKonsumen();  // Ambil semua konsumen
    return new Response(JSON.stringify(konsumen), { status: 200 });
  } catch (error) {
    return new Response('Error fetching konsumen data', { status: 500 });
  }
}

export async function POST(request) {
  const konsumen = await request.json();  // Ambil data konsumen dari body request
  try {
    const newKonsumen = await addKonsumen(konsumen);  // Tambah konsumen baru
    return new Response(JSON.stringify(newKonsumen), { status: 201 });
  } catch (error) {
    return new Response('Error adding konsumen', { status: 500 });
  }
}

export async function PUT(request) {
  const { id } = request.query;  // Ambil id konsumen dari query parameter
  const konsumen = await request.json();  // Ambil data konsumen yang akan diperbarui
  try {
    const updatedKonsumen = await updateKonsumen(id, konsumen);  // Update konsumen
    return new Response(JSON.stringify(updatedKonsumen), { status: 200 });
  } catch (error) {
    return new Response('Error updating konsumen', { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    console.log("ID diterima:", id); // Log ID untuk memastikan
    if (!id) {
      return new Response("ID tidak ditemukan dalam permintaan", { status: 400 });
    }

    const deletedKonsumen = await deleteKonsumen(id);

    if (!deletedKonsumen) {
      return new Response("Konsumen tidak ditemukan", { status: 404 });
    }

    return new Response(JSON.stringify(deletedKonsumen), { status: 200 });
  } catch (error) {
    console.error("Error deleting konsumen:", error);
    return new Response("Error deleting konsumen", { status: 500 });
  }
}


