import { FiBriefcase, FiCreditCard, FiBook } from "react-icons/fi";
// https://react-icons.github.io/react-icons/icons?name=fi

export const Menus = [
  {
    title: "Formações",
    to: "formacao",
    icon: <FiBriefcase />,
    submenu: true,
    opened: false,
    submenuItems: [
      {
        title: "Adicionar formação",
        to: "formacao/adicionar-formacao"
      },
      {
        title: "Pesquisar formação",
        to: "formacao/adicionar-formacao"
      },
    ],
  },
  {
    title: "Controlo de budget",
    to: "controlo",
    icon: <FiCreditCard />,
    submenu: true,
    opened: false,
    submenuItems: [
      {
        title: "Dashboard",
        to: "controlo/adicionar-formacao",
      },
      {
        title: "Gerir pedidos",
        to: "controlo/adicionar-formacao",
      },
      {
        title: "Colaboradores",
        to: "controlo/adicionar-formacao",
      },
    ],
  },
  {
    title: "Fórum",
    to: "forum",
    icon: <FiBook />,
    submenu: true,
    opened: false,
    submenuItems: [
      {
        title: "Minhas publicações",
        to: "adicionar-formacao",
      },
      {
        title: "Pesquisar",
        to: "adicionar-formacao",
      },
      {
        title: "Adicionar publicação",
        to: "adicionar-formacao",
      },
    ],
  },
];
