import { AvatarCell, SelectColumnFilter, StatusPillRole } from '../components/TableComponent/Table'

export const getColumnsTable = () => {
  const data = [
    {
      Header: "Nome", //title of colum
      accessor: "nome", //atributo que vai buscar à data chave do objeto
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "email",
    },
    {
      Header: "Budget Utilizado",
      accessor: "budgetUsed",
    },
    {
      Header: "Budget em aprovação",
      accessor: "emAprovacao",
    },
    {
      Header: "Budget Restante",
      accessor: "budgetRestante",
    },
    {
      Header: "Formações feitas",
      accessor: "numFormacao",
    },
    {
      Header: "Formações Pendentes",
      accessor: "numFormacaoPendentes",
    },
    {
      Header: "Role",
      accessor: "role",
      Filter: SelectColumnFilter,  // new
      Cell: StatusPillRole,
      filter: "includes",
    },
  ];
  return [...data];
};
