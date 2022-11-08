import React, { useState } from "react";
import { Menus } from "../constants/menuConstants";
import { FiLogOut } from "react-icons/fi";
<<<<<<< Updated upstream
=======
import { NavLink } from "react-router-dom";
import SidebarArrow from "../assets/sidebar/sidebarArrow.png";
import LogoGrama from "../assets/sidebar/logoGrama.png";
>>>>>>> Stashed changes

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <>
      <div
        className={`${
          open ? "w-[15.5rem]" : "w-[5rem]"
        } duration-300 bg-darkBlack relative`}
      >
        <img
          src={SidebarArrow}
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-darkBlack ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <img
          src={LogoGrama}
          className={`absolute cursor-pointer duration-500 w-[1.7rem] h-[2.3rem] left-6 top-6`}
        />

<<<<<<< Updated upstream
        <ul className="relative top-24">
          {Menus.map((menu, index) => (
            <>
              <div className="relative h-12 w-[12.5rem] left-3">
                <li
                  key={index}
                  className={`h-8 text-white text-sm flex items-center gap-x-4 cursor-pointer mt-9 hover:bg-primary hover:rounded-sm hover:text-darkBlack ${
                    open ? "w-44" : "w-12"
                  }`}
                  onClick={() => {
                    if (menu.submenu) {
                      menu.opened = !submenuOpen;
                      setSubmenuOpen(!submenuOpen);
                    }
                  }}
                >
                  <span className="w-4 h-4 absolute float-left left-[0.875rem]">
                    {menu.icon}
                  </span>
                  <span
                    className={`relative text-sm font-IBM font-medium flex-1 duration-400 left-[2.375rem] ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                </li>
              </div>

              {menu.submenu && menu.opened && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, index) => (
                    <div className="relative h-12 w-[12.5rem] border-l-2 border-l-black2 left-8 pl-4 ative:border-r-2 active:border-r-primary">
                      <li
                        key={index}
                        className="w-44 h-8 text-white text-sm flex items-end gap-2 cursor-pointer hover:text-primary"
                        onClick={() => {}}
                      >
                        {submenuItem.title}
                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
=======
        {/* Menu */}
        {Menus.map((menu, index) => (
          <div key={index} className="relative top-24">
            <div className="divMenuItem">
              <NavLink
                key={index}
                to={menu.to}
                className={`menuItem ${open ? "w-44" : "w-12"}`}
                onClick={() => {
                  if (menu.submenu) {
                    menu.opened = !submenuOpen;
                    setSubmenuOpen(!submenuOpen);
                  }
                }}
              >
                <span className="menuIcon">{menu.icon}</span>
                <span className={`menuTitle duration-400 ${!open && "hidden"}`}>
                  {menu.title}
                </span>
              </NavLink>
            </div>

            {menu.submenu && menu.opened && open && (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <div key={index} className="divSubmenu">
                    <NavLink
                      key={index}
                      to={submenuItem.to}
                      className="submenuItem"
                      onClick={() => {}}
                    >
                      {submenuItem.title}
                    </NavLink>
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
>>>>>>> Stashed changes

        {/* Logout */}
        <ul className="absolute bottom-20">
          <div className="divMenuItem">
            <li
              className={`menuItem ${open ? "w-44" : "w-12"}`}
              onClick={() => {}}
            >
              <FiLogOut className="menuIcon" />
              <span className={`menuTitle duration-400 ${!open && "hidden"}`}>
                Logout
              </span>
            </li>
          </div>
        </ul>

        {/* User information (photo, name, email and role) */}
        <div className="absolute bottom-5">
          <div className="relative left-[1.625rem] flex flex-row items-center gap-4 h-12 w-[12.5rem] py-[0.813rem]">
            {/* User photo */}
            <img
              src="./src/assets/sidebar/logoGrama.png"
              className="w-8 h-8 flex flex-grow-0 rounded-3xl"
            />
            <div className={`flex flex-col items-start ${!open && "hidden"}`}>
              <span className="font-IBM font-normal text-sm text-white ">
                Utilizador Teste
              </span>
              <span className="font-IBM font-normal text-xs text-gray4">
                teste@gmail.com
              </span>

              <div className="userRoleDisplay">
                <span className="font-IBM font-normal text-xs text-white ">
                  Manager
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
