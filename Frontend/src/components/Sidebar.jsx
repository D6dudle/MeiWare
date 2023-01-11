import React, { useState, useEffect } from "react";
import { Menus } from "../constants/menuConstants";
import { LogOut } from "react-feather";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SidebarArrow from "../assets/sidebar/sidebarArrow.png";
import LogoGrama from "../assets/sidebar/logoGrama.png";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Sidebar = ({ trigger }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [subMenuClicked, setSubmenuClicked] = useState(null);
  const nav = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const user = UserService.getCurrentUser();
  
    var highestRole = "COLABORADOR";
    if (user.isGestor) highestRole = "GESTOR";
    if (user.isAdministrador) highestRole = "ADMIN";
    setUserDetails({
      name: user.nome,
      email: user.email,
      role: highestRole,
    });
  }, []);

  const location = useLocation();

  const [path, setPath] = useState("");
  const [menus, setMenu] = useState(Menus);

  function possiblePaths(path) {
    let pathElem = path.split("/");
    let home = pathElem.indexOf("home");

    pathElem = pathElem.slice(home + 1, pathElem.length);

    let posPaths = [];

    for (let i = 1; i <= pathElem.length; i++) {
      posPaths.push(pathElem.slice(0, i).join("/"));
    }

    return posPaths;
  }

  function updateMenu(newPath, oldPath) {
    let newPossiblePaths = possiblePaths(newPath);
    let oldPossiblePaths = [];

    if (oldPath != null) {
      oldPossiblePaths = possiblePaths(oldPath);
    }

    //console.log("OLD ",oldPossiblePaths)
    //console.log("NEW ",newPossiblePaths)

    let final = JSON.stringify(menus, (_, nestedValue) => {
      if (nestedValue && newPossiblePaths.includes(nestedValue["to"])) {
        nestedValue["opened"] = true;
      } else if (nestedValue && oldPossiblePaths.includes(nestedValue["to"])) {
        nestedValue["opened"] = false;
      }

      return nestedValue;
    });

    final = JSON.parse(final);

    setPath(newPath);
  }

  useEffect(() => {
    updateMenu(location.pathname);
  }, []);

  const navigate = (tab, old) => {
    console.log("SIDEBAR - Cliquei no ",tab," OLD ",old)
    updateMenu(tab, old);
  };

  React.useEffect(() => {
    trigger.current = navigate;
  }, [trigger]);

  const handleLogout = () => {
    AuthService.logout();
    nav("/");
  };

  function showMenu(g) {
    if(!g) {
      return true;
    }
    else if(UserService.getCurrentUser().isGestor) {
      return true
    }
    else {
      return false;
      
    }
  }

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
          onClick={() => {
            setOpen(!open);
          }}
        />
        <img
          src={LogoGrama}
          className={`absolute cursor-pointer duration-500 w-[1.7rem] h-[2.3rem] left-6 top-6`}
        />

        {/* Menu */}
        {menus.map((menu, index) => {
          if(showMenu(menu.gestor))
            return (
              <div key={index} className="relative top-24">
                <div className="divMenuItem">
                  <NavLink
                    key={index}
                    to={menu.path ? menu.path : menu.to}
                    className={`menuItem ${
                      open
                        ? "w-44" &&
                          (menu.opened
                            ? "bg-primary rounded-sm text-darkBlack"
                            : "w-44")
                        : "w-12" &&
                          (menu.opened
                            ? "w-12 bg-primary rounded-sm text-darkBlack"
                            : "w-12")
                    }`}
                    onClick={(event) => updateMenu(menu.to, path)}
                  >
                    <span className="menuIcon">{menu.icon}</span>
                    <span
                      className={`menuTitle duration-400 ${!open && "hidden"}`}
                    >
                      {menu.title}
                    </span>
                  </NavLink>
                </div>

                {menu.submenu && menu.opened && open && (
                  <ul>
                    {menu.submenuItems.map((submenuItem, index) => {
                      if(showMenu(submenuItem.gestor))
                        return(<div
                          key={index}
                          className={`divSubmenu ${
                            submenuItem.opened && "border-r-2 border-r-primary "
                          }`}
                        >
                          <NavLink
                            key={index}
                            to={submenuItem.to}
                            className={`submenuItem ${
                              submenuItem.opened ? "text-primary" : "text-white"
                            }`}
                            onClick={(event) => updateMenu(submenuItem.to, path)}
                          >
                            {submenuItem.title}
                          </NavLink>
                        </div>);
                   })}
                  </ul>
                )}
              </div>
            );
        })}

        {/* Logout */}
        <ul className="absolute bottom-20">
          <div className="divMenuItem">
            <li
              className={`menuItem ${open ? "w-44" : "w-12"}`}
              onClick={handleLogout}
            >
              <LogOut className="menuIcon" />
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
            <div className="w-8 h-8 flex flex-grow-0 ">
              <img src={LogoGrama} className="rounded-full" />
            </div>
            <div className={`flex flex-col items-start ${!open && "hidden"}`}>
              <span className="font-IBM font-normal text-sm text-white ">
                {userDetails.name}
              </span>
              <span className="font-IBM font-normal text-xs text-gray4">
                {userDetails.email}
              </span>

              <div className="userRoleDisplay">
                <span className="font-IBM font-normal text-xs text-white ">
                  {userDetails.role}
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
