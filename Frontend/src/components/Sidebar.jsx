import React, { useState } from "react";
import { Menus } from "../constants/menuConstants";
import { FiLogOut } from "react-icons/fi";

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
          src="./src/assets/sidebar/control.png"
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-darkBlack ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <img
          src="./src/assets/sidebar/logoGrama.png"
          className={`absolute cursor-pointer duration-500 w-[1.7rem] h-[2.3rem] left-6 top-6`}
        />

        <ul className="relative top-24">
          {Menus.map((menu, index) => (
            <>
              <div className="relative h-12 w-[12.5rem] left-3">
                <li
                  key={index}
                  className={`h-8 text-white text-sm flex items-center gap-x-4 cursor-pointer mt-9 hover:bg-yellow-500 hover:rounded-sm hover:text-darkBlack ${
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
                    <div className="relative h-12 w-[12.5rem] border-l-2 border-l-gray-800 left-8 pl-4 ative:border-r-2 active:border-r-amber-400">
                      <li
                        key={index}
                        className="w-44 h-8 text-white text-sm flex items-end gap-2 cursor-pointer hover:text-amber-400 "
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

        <ul className="absolute bottom-20">
          <div className="relative h-12 w-[12.5rem] left-3">
            <li
              className={`h-8 text-white text-sm flex items-center gap-x-4 cursor-pointer mt-9 hover:bg-yellow-500 hover:rounded-sm hover:text-darkBlack ${
                open ? "w-44" : "w-12"
              }`}
              onClick={() => {}}
            >
              <FiLogOut className="w-4 h-4 absolute float-left left-[0.875rem]" />
              <span
                className={`relative text-sm font-IBM font-medium flex-1 duration-400 left-[2.375rem] ${
                  !open && "hidden"
                }`}
              >
                Logout
              </span>
            </li>
          </div>
        </ul>

        <div className="absolute bottom-5">
          <div className="relative left-[1.625rem] flex flex-row items-center gap-4 h-12 w-[12.5rem] py-[0.813rem]">
            <img
              src="./src/assets/sidebar/logoGrama.png"
              className="w-8 h-8 flex flex-grow-0 rounded-3xl"
            />
            <div className={`flex flex-col items-start ${!open && "hidden"}`}>
              <span className="font-IBM font-normal text-sm text-white ">
                Utilizador Teste
              </span>
              <span className="font-IBM font-normal text-xs text-gray-400">
                teste@gmail.com
              </span>

              <div className="relative top-2 flex flex-col items-center justify-center py-[0.125rem] px-1 gap-2 border border-gray-300 rounded-sm">
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
