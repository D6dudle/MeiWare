import React, { useState, useEffect, useCallback } from "react";
import "regenerator-runtime/runtime";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
//import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { Button, PageButton } from "./Button";
import { classNames } from "./Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "./Icons";
//import { PencilAltIcon } from '@heroicons/react/solid'
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import Modal from "../Modal";
import UtilizadoresService from "../../services/get-utilizadores.service";
import { Plus } from "react-feather";

import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";

import { isConstructorDeclaration } from "typescript";
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <label className="flex gap-x-2 items-baseline w-fit">
      <span className="text-white">Pesquisa: </span>
      <input
        type="text"
        className="inputText"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} entradas...`}
      />
    </label>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="md:pl-4 flex gap-x-2 items-baseline w-fit">
      <span className="text-white">{render("Header")}: </span>
      <select
        className="inputText"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">Todas</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function StatusPillRole({ value }) {
  const status = value ? value.toLowerCase() : "unknown";

  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("admin") ? "bg-green1 text-green-800" : null,
        status.startsWith("manager") ? "bg-pastel text-yellow-800" : null,
        status.startsWith("colaborador") ? "bg-error text-red-800" : null
      )}
    >
      {status}
    </span>
  );
}

export function AvatarCell({ value, column, row }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {value[0]}
          </span>
        </div>

        {/* PARA POR AVATAR PERSONALIZADO DESCOMENTAR E SUBSTITUIR PELAS LINHAS ACIMA
        <img
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        /> 
        */}
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-white">{value}</div>
        <div className="text-sm text-gray3">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  );
}

const tableHooks = (hooks) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalUser, setModalUser] = useState({ show: false, data: null });
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleCloseModal = () => {
    setModalUser({ show: false, data: null });
  };

  const confirmeActionModal = (u) => {
    /*
    setUsers(usersList.filter((user) => u.email !== user.email));
    setUser(users[0]);
    setModal({ show: false, data: null });*/
  };

  const handleExcluir = (u) => {
    UtilizadoresService.removeUtilizador(u).then((data) => {
      window.location.reload(true);
    });
  };

  hooks.visibleColumns.push((columns) => [
    ...columns,
    {
      id: "Edit",
      Header: "",
      Cell: ({ row }) => (
        <div className="flex gap-12">
          <HiPencilAlt
            className="text-white cursor-pointer"
            onClick={() => {
              const params = {
                id: row.original.id,
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
            }}
          />
          <HiTrash
            className="text-white cursor-pointer"
            onClick={() => {
              handleExcluir(row.original.id);
            }}
          />
          {modalUser.show && (
            <Modal
              closeModal={handleCloseModal}
              confirmeActionModal={() => confirmeActionModal(row.original.age)}
              //data={modal.data}
            />
          )}
        </div>
      ),
    },
  ]);
};

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const navigate = useNavigate();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    tableHooks,
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  const handleAdicionar = () => {
    navigate("/home/controlo/colaboradores/adicionar-colaborador");
  };

  // Render the UI for your table
  return (
    <>
      <div className="flex md:flex-row flex-col justify-evenly md:justify-between md:items-center items-start gap-8 pt-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}

        <button
          className="actionButtons bg-primary"
          onClick={() => handleAdicionar()}
        >
          <Plus className="w-4 h-4 text-black" />
          <p className="actionBtnInsideInfo">Adicionar colaborador</p>
        </button>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <span className="text-sm text-white">
              Página <span className="font-medium">{state.pageIndex + 1}</span>{" "}
              de <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="inputText"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <PageButton
                className="rounded-l-md"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <HiChevronDoubleLeft
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <HiChevronLeft
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
                <span className="sr-only">Next</span>
                <HiChevronRight
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </PageButton>
              <PageButton
                className="rounded-r-md"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <HiChevronDoubleRight
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </PageButton>
            </nav>
          </div>
        </div>
      </div>

      {/* table */}
            <div className="shadow flex overflow-hidden w-full border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className=" divide-y divide-gray4 w-full"
              >
                <thead className="bg-darkBlack">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="w-full">
                      {headerGroup.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {column.render("Header")}
                            {/* Add a sort direction indicator */}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <SortDownIcon className="w-4 h-4 text-primary" />
                                ) : (
                                  <SortUpIcon className="w-4 h-4 text-primary" />
                                )
                              ) : (
                                <SortIcon className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-black2 divide-y divide-gray2"
                >
                  {page.map((row, i) => {
                    // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer" ? (
                                <div className="text-sm text-gray-500">
                                  {cell.render("Cell")}
                                </div>
                              ) : (
                                cell.render("Cell")
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
    </>
  );
}

export default Table;
