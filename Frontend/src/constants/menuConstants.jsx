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
        to: "formacao/adicionar-formacao",
      },
      {
        title: "Pesquisar formação",
        to: "formacao/pesquisar-formacao",
      },
      {
        title: "Listar Formação",
        to: "formacao/listar-formacao",
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
        title: "Gerir pedidos",
        to: "controlo/gerir-pedidos",
      },
      {
        title: "Colaboradores",
        to: "controlo/colaboradores",
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
        to: "forum/minhas-publicacoes",
      },
      {
        title: "Pesquisar",
        to: "forum/pesquisar",
      },
      {
        title: "Adicionar publicação",
        to: "forum/adicionar-publicacao",
      },
    ],
  },
];
