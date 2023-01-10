import { AvatarCell, SelectColumnFilter, StatusPillRole } from '../components/TableComponent/Table'

export const getDataUsers = () => {
  const data = [
    {
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      status: "Active",
      role: "Admin",
      age: 27,
      imgUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      //icon: <PencilAltIcon/>,
      budgetUsed: "300,00 €",
      emAprovacao: "40,00 €",
      numFormacao: 3,
    },
    {
      name: "Cody Fisher",
      email: "cody.fisher@example.com",
      title: "Product Directives Officer",
      department: "Intranet",
      status: "Inactive",
      role: "Manager",
      age: 43,
      imgUrl:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      //icon: <PencilAltIcon/>,
      budgetUsed: "256,00 €",
      emAprovacao: "40,00 €",
      numFormacao: 3,
    },
    {
      name: "Esther Howard",
      email: "esther.howard@example.com",
      title: "Forward Response Developer",
      department: "Directives",
      status: "Active",
      role: "Colaborador",
      age: 32,
      imgUrl:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      //icon: <PencilAltIcon/>,
      budgetUsed: "100,00 €",
      emAprovacao: "40,00 €",
      numFormacao: 5,
    },
    {
      name: "Jenny Wilson",
      email: "jenny.wilson@example.com",
      title: "Central Security Manager",
      department: "Program",
      status: "Offline",
      role: "Colaborador",
      age: 29,
      imgUrl:
        "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      //icon: <PencilAltIcon/>,
      budgetUsed: "300,00 €",
      emAprovacao: "40,00 €",
      numFormacao: 2,
    },
    {
      name: "Kristin Watson",
      email: "kristin.watson@example.com",
      title: "Lean Implementation Liaison",
      department: "Mobility",
      status: "Inactive",
      role: "Admin",
      age: 36,
      imgUrl:
        "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      //icon: <PencilAltIcon/>,
      budgetUsed: "300,00 €",
      emAprovacao: "20,00 €",
      numFormacao: 4,
    },
    {
      name: "Cameron Williamson",
      email: "cameron.williamson@example.com",
      title: "Internal Applications Engineer",
      department: "Security",
      status: "Active",
      role: "Colaborador",
      age: 24,
      imgUrl:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      //icon: <PencilAltIcon/>,
      budgetUsed: "300,00 €",
      emAprovacao: "10,00 €",
      numFormacao: 3,
    },
  ];
  return [...data, ...data, ...data];
};

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
      Header: "Formações feitas",
      accessor: "numFormacao",
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
