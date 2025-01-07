import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";  // Pastikan Link sudah diimpor

export default function MainMenu({ menu, isActive, onToggle }) {
  return (
    <li>
      <Link href={menu.path}> {/* Gunakan Link untuk navigasi */}
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
        >
          <div className="flex items-center gap-2">
            {menu.icon}
            <span className="font-semibold">{menu.name}</span>
          </div>
          {menu.subMenu.length > 0 &&
            (isActive ? <FaChevronUp /> : <FaChevronDown />)}
        </button>
      </Link>
    </li>
  );
}
