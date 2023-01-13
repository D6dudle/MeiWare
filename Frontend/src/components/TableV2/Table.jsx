import React from "react";
import { useTable } from "react-table";
import UtilizadoresService from "../../services/get-utilizadores.service";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";

const TableV2 = ({ columns, data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({
    columns,
    data,
  });

  columns.push({
    id: "delete",
    accessor: "id",
    Cell: ({ value }) => (
      <a
        onClick={() => {
          handleExcluir(value);
        }}
      >
        Delete
      </a>
    ),
  });

  columns.push({
    id: "editar",
    accessor: "id",
    Cell: ({ value }) => (
      <a
        className="cursor-pointer"
        onClick={() => {
          handleEditar(value);
        }}
      >
        Edit
      </a>
    ),
  });

  const handleExcluir = (u) => {
    UtilizadoresService.removeUtilizador(u).then((data) => {
      //window.location.reload(false);
    });
  };

  const handleEditar = (u) => {
    const params = {
      id: u,
    };

    navigate(
      {
        pathname: "/home/controlo/colaboradores/editar-colaborador",
        search: createSearchParams(params).toString(),
      },
      {
        state: {
          prevUrl: location.pathname,
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
          <table
            className="min-w-full divide-y divide-gray-200"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              {...getTableBodyProps()}
            >
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TableV2;
