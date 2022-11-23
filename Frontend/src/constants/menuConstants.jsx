import { Briefcase, CreditCard, Book } from "react-feather";
import { Image, File, Archive } from "react-feather";

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
      {
        title: "Listar Formação",
        to: "formacao/listar-formacao",
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
    to: "forum/pesquisar",
    icon: <Book className="w-4 h-4" />,
    submenu: true,
    opened: false,
    submenuItems: [
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

export const iconImageUpload = [
  { type: "image/png", icon: Image },
  { type: "image/jpeg", icon: Image },
  { type: "application/pdf", icon: File },
  { type: "application/zip", icon: Archive },
];
