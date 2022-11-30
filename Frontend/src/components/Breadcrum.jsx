import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "react-feather";

export const Breadcrum = ({ callback }) => {
  const location = useLocation();

  const breadcrumbs = useBreadcrumbs();

  const handleLinkClick = (path) => {
    callback(path, location.pathname);
  };

  return (
    <div className=" flex flex-row justify-start items-center  h-[2.5rem] pb-4 rounded-sm text-gray3 ">
      {breadcrumbs.slice(1).map(({ match, breadcrumb }, index, row) => (
        <NavLink
          key={match.pathname}
          to={
            match.pathname == "/home/knowledge"
              ? "/home/knowledge/pesquisar"
              : match.pathname
          }
          onClick={(event) =>
            handleLinkClick(
              match.pathname == "/home/knowledge"
                ? "/home/knowledge/pesquisar"
                : match.pathname
            )
          }
          className={`flex mr-2 ${
            index + 1 === row.length ? "text-white" : ""
          }`}
        >
          {breadcrumb}

          {index + 1 !== row.length ? (
            <ChevronRight className="text-white ml-2" />
          ) : (
            ""
          )}
        </NavLink>
      ))}
    </div>
  );
};
