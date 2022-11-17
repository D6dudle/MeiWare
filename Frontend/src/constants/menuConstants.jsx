import { Briefcase, CreditCard, Book } from "react-feather";

export const Menus = [
  {
    title: "Formações",
    to: "formacao",
    icon: <Briefcase className="w-4 h-4" />,
    submenu: true,
    opened: false,
    submenuItems: [
      {
        title: "Adicionar formação",
        to: "formacao/adicionar-formacao",
        opened: false,
      },
      {
        title: "Pesquisar formação",
        to: "formacao/pesquisar-formacao",
        opened: false,
      },
    ],
  },
  {
    title: "Controlo de budget",
    to: "controlo",
    icon: <CreditCard className="w-4 h-4" />,
    submenu: true,
    opened: false,
    submenuItems: [
      {
        title: "Gerir pedidos",
        to: "controlo/gerir-pedidos",
        opened: false,
      },
      {
        title: "Colaboradores",
        to: "controlo/colaboradores",
        opened: false,
      },
      {
        title: "Listar pedidos",
        to: "controlo/listar-pedidos",
        opened: false,
      },
    ],
  },
  {
    title: "Fórum",
    to: "forum",
    icon: <Book className="w-4 h-4" />,
    submenu: true,
    opened: false,
    submenuItems: [
      {
        title: "Minhas publicações",
        to: "forum/minhas-publicacoes",
        opened: false,
      },
      {
        title: "Pesquisar",
        to: "forum/pesquisar",
        opened: false,
      },
      {
        title: "Adicionar publicação",
        to: "forum/adicionar-publicacao",
        opened: false,
      },
    ],
  },
];
