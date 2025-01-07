"use client";

import { useState } from "react";
import { menuData } from "./menuData";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function Menu() {
  const [activeMenus, setActiveMenus] = useState([]); // Menyimpan menu yang sedang aktif

  const handleMenuToggle = (menuName) => {
    setActiveMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((item) => item !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <aside className="w-64 bg-white text-gray-800 p-4 shadow-lg">
      <ul>
        {menuData.map((menu) => (
          <li key={menu.name} className="mb-2">
            {/* Menu utama */}
            {menu.path ? (
              <Link href={menu.path}>
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                    activeMenus.includes(menu.name)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-100 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center">
                    {menu.icon}
                    <span className="ml-2">{menu.name}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                  activeMenus.includes(menu.name)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 hover:text-blue-600"
                }`}
                onClick={() => handleMenuToggle(menu.name)}
              >
                <div className="flex items-center">
                  {menu.icon}
                  <span className="ml-2">{menu.name}</span>
                </div>
                {menu.subMenu.length > 0 && (
                  <span>
                    {activeMenus.includes(menu.name) ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                )}
              </div>
            )}

            {/* SubMenu */}
            {menu.subMenu.length > 0 && activeMenus.includes(menu.name) && (
              <ul className="ml-6 mt-2">
                {menu.subMenu.map((subItem) => (
                  <li key={subItem.name} className="mb-2">
                    <Link href={subItem.path}>
                      <div className="px-3 py-2 rounded-md cursor-pointer hover:bg-blue-200 hover:text-blue-600">
                        {subItem.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
