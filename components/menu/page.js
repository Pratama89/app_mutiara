import { useState } from "react";
import MainMenu from "./MainMenu";
import SubMenu from "./SubMenu";
import { menuData } from "./menuData";

export default function Menu({ onLogout }) {
  // Menyimpan daftar menu yang aktif dalam bentuk array
  const [activeMenus, setActiveMenus] = useState([]);

  const handleMenuToggle = (menuName) => {
    // Jika menu yang sama diklik, tutup submenu, jika tidak, buka submenu baru
    if (activeMenus.includes(menuName)) {
      setActiveMenus(activeMenus.filter((item) => item !== menuName));
    } else {
      setActiveMenus([...activeMenus, menuName]);
    }
  };

  return (
    <aside className="w-64 bg-white text-gray-800 p-4 shadow-lg">
      <ul>
        {menuData.map((menu) => (
          <div key={menu.name}>
            <MainMenu
              menu={menu}
              isActive={activeMenus.includes(menu.name)} // Cek apakah menu aktif
              onToggle={() => handleMenuToggle(menu.name)} // Toggle status menu
            />
            <SubMenu subMenu={menu.subMenu} isVisible={activeMenus.includes(menu.name)} />
          </div>
        ))}
      </ul>
    </aside>
  );
}
