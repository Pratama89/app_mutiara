import { FiHome, FiBriefcase, FiBook, FiDollarSign, FiSettings, FiClipboard } from "react-icons/fi";

export const menuData = [
  {
    name: "Dashboard",
    icon: <FiHome className="text-gray-600" />,
    path: "/dashboard",
    subMenu: [],
  },
  {
    name: "Perusahaan",
    icon: <FiBriefcase className="text-gray-600" />,
    subMenu: [
      { name: "Konsumen", path: "/dashboard/konsumen" },
      { name: "Pemasok", path: "/dashboard/pemasok" },
      { name: "Karyawan", path: "/dashboard/karyawan" },
    ],
  },
  {
    name: "Buku Besar",
    icon: <FiBook className="text-gray-600" />,
    subMenu: [
      { name: "Akun Perkiraan", path: "/dashboard/akun-perkiraan" },
      { name: "Pencatatan Gaji", path: "/dashboard/pencatatan-gaji" },
      { name: "Jurnal Umum", path: "/dashboard/jurnal-umum" },
    ],
  },
  {
    name: "Kas Bank",
    icon: <FiDollarSign className="text-gray-600" />,
    subMenu: [
      { name: "Pembayaran", path: "/dashboard/pembayaran" },
      { name: "Penerimaan", path: "/dashboard/penerimaan" },
      { name: "Transfer Bank", path: "/dashboard/transfer-bank" },
      { name: "Giro", path: "/dashboard/giro" },
    ],
  },
  {
    name: "Penjualan",
    icon: <FiDollarSign className="text-gray-600" />,
    subMenu: [
      { name: "PO Penjualan", path: "/dashboard/po-penjualan" },
      { name: "Penjualan", path: "/dashboard/penjualan" },
      { name: "Return Penjualan", path: "/dashboard/return-penjualan" },
    ],
  },
  {
    name: "Pembelian",
    icon: <FiDollarSign className="text-gray-600" />,
    subMenu: [
      { name: "PO Pembelian", path: "/dashboard/po-pembelian" },
      { name: "Pembelian", path: "/dashboard/pembelian" },
      { name: "Return Pembelian", path: "/dashboard/return-pembelian" },
    ],
  },
  {
    name: "Persediaan",
    icon: <FiDollarSign className="text-gray-600" />,
    subMenu: [
      { name: "PO Persediaan", path: "/dashboard/po-persediaan" },
      { name: "Pemindahan Barang", path: "/dashboard/pemindahan-barang" },
      { name: "Data Barang", path: "/dashboard/data-barang" },
      { name: "Stok Opnam Barang", path: "/dashboard/stok-opnam-barang" },
      { name: "Kategori Barang", path: "/dashboard/kategori-barang" },
    ],
  },
  {
    name: "Aset Tetap",
    icon: <FiDollarSign className="text-gray-600" />,
    subMenu: [
      { name: "Aset Tetap", path: "/dashboard/aset-tetap" },
      { name: "Kategori Aset", path: "/dashboard/kategori-aset" },
    ],
  },
  {
    name: "Pengaturan",
    icon: <FiSettings className="text-gray-600" />,
    subMenu: [
      { name: "Akses Group", path: "/dashboard/akses-group" },
      { name: "Pengaturan Pengguna", path: "/dashboard/pengaturan-pengguna" },
    ],
  },
  {
    name: "Laporan",
    icon: <FiClipboard className="text-gray-600" />,
    subMenu: [
      { name: "Rekap Konsumen", path: "/dashboard/rekap-konsumen" },
      { name: "Rekap Pemasok", path: "/dashboard/rekap-pemasok" },
      { name: "Rekap Penjualan", path: "/dashboard/rekap-penjualan" },
      { name: "Rekap Pembelian", path: "/dashboard/rekap-pembelian" },
      { name: "Rekap Pembayaran Customer", path: "/dashboard/rekap-pembayaran-customer" },
      { name: "Rekap Pembayaran Pemasok", path: "/dashboard/rekap-pembayaran-pemasok" },
      { name: "Rekap Piutang Konsumen", path: "/dashboard/rekap-piutang-konsumen" },
      { name: "Rekap Hutang Pemasok", path: "/dashboard/rekap-hutang-pemasok" },
    ],
  },
];
