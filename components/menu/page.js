"use client";

import { useState } from "react";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";
import { menuData } from "./menuData";
import Link from "next/link";  // Pastikan kita menggunakan Link dari Next.js
import { useRouter } from "next/navigation";

export default function Menu({ setActiveContent }) {
  const [activeMenus, setActiveMenus] = useState([]);

  const handleMenuToggle = (menuName) => {
    if (activeMenus.includes(menuName)) {
      setActiveMenus(activeMenus.filter((item) => item !== menuName));
    } else {
      setActiveMenus([...activeMenus, menuName]);
    }
  };

  const router = useRouter();

  const handleMenuClick = (path) => {
    router.push(path); // Arahkan ke halaman yang sesuai
  };

  return (
    <aside className="w-64 bg-white text-gray-800 p-4 shadow-lg">
      <ul>
        {menuData.map((menu) => (
          <div key={menu.name}>
            {/* Gunakan div untuk membungkus li untuk menghindari nesting */}
            <div>
              <Link href={menu.path}>
                <MainMenu
                  menu={menu}
                  isActive={activeMenus.includes(menu.name)}
                  onToggle={() => handleMenuToggle(menu.name)}
                  onClick={() => handleMenuClick(menu.path)} // Path untuk menu utama
                />
              </Link>

              {/* SubMenu */}
              {menu.subMenu.length > 0 && (
                <SubMenu
                  subMenu={menu.subMenu}
                  isVisible={activeMenus.includes(menu.name)}
                  onClick={(subMenuPath) => handleMenuClick(subMenuPath)} // Path untuk submenu
                />
              )}
            </div>
          </div>
        ))}
      </ul>
    </aside>
  );
}
