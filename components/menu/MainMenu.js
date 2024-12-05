import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function MainMenu({ menu, isActive, onToggle }) {
  return (
    <li>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-blue-100"
      >
        <div className="flex items-center gap-2">
          {menu.icon}
          <span className="font-semibold">{menu.name}</span>
        </div>
        {menu.subMenu.length > 0 && (isActive ? <FaChevronUp /> : <FaChevronDown />)}
      </button>
    </li>
  );
}
