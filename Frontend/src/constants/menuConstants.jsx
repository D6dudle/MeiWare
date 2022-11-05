import { FiBriefcase, FiCreditCard, FiBook } from "react-icons/fi";
// https://react-icons.github.io/react-icons/icons?name=fi

export const Menus = [
  {
    title: "Formações",
    icon: <FiBriefcase />,
    submenu: true,
    opened: false,
    submenuItems: [
      { title: "Adicionar formação" },
      { title: "Pesquisar formação" },
    ],
  },
  {
    title: "Controlo de budget",
    icon: <FiCreditCard />,
    submenu: true,
    opened: false,
    submenuItems: [
      { title: "Dashboard" },
      { title: "Gerir pedidos" },
      { title: "Colaboradores" },
    ],
  },
  {
    title: "Fórum",
    icon: <FiBook />,
    submenu: true,
    opened: false,
    submenuItems: [
      { title: "Minhas publicações" },
      { title: "Pesquisar" },
      { title: "Adicionar publicação" },
    ],
  },
];
