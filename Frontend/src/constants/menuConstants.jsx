import { FiBriefcase, FiCreditCard, FiBook } from "react-icons/fi";
import { Image, File, Archive} from 'react-feather'
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

export const iconImageUpload = [
  {type: "image/png", icon: Image },
  {type: "image/jpeg", icon: Image },
  {type: "application/pdf", icon: File },
  {type: "application/zip", icon: Archive },
]
