import Link from "next/link";

export default function SubMenu({ subMenu, isVisible, onClick }) {
  return (
    <div
      className={`ml-6 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
        isVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <ul>
        {subMenu.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => onClick(item.path)}
              className="block w-full text-left py-2 px-4 hover:bg-blue-100"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

