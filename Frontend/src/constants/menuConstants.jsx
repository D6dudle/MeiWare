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
    ],
  },
  {
    title: "Knowledge base",
    to: "knowledge",
    icon: <Book className="w-4 h-4" />,
    submenu: true,
    opened: false,
    submenuItems: [
      {
        title: "Adicionar publicação",
        to: "knowledge/adicionar-publicacao",
        opened: false,
      },
      {
        title: "Aprovar publicações",
        to: "knowledge/aprovar-publicacao",
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
