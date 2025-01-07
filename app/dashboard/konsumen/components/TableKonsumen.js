import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function TableKonsumen({ konsumen, onEdit, onDelete, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
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
              <td className="px-4 py-2 flex justify-start">
                <button
                  onClick={() => onView(item.id)}
                  className="text-gray-500 hover:text-gray-700 mr-2"
                >
                  <EyeIcon className="h-5 w-5 inline-block" />
                </button>
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <PencilIcon className="h-5 w-5 inline-block" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5 inline-block" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
