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
      {
        title: "Listar pedidos",
        to: "controlo/listar-pedidos",
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

export const dataCard = [
  {
    username: "Pedro",
    nomeformacao: "Introdução a Angular",
    dataFormacao: "16/11/2022 14:00",
    justificacaoFormacao:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    idCurso: "P-T-331",
    tipoFormacao: "TERMINADA",
    consultar: true,
  },
  {
    username: "Henrique",
    nomeformacao: "Introdução a Java",
    dataFormacao: "18/11/2022 14:00",
    justificacaoFormacao:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    idCurso: "H-T-666",
    tipoFormacao: "CURSO",
  },
  {
    username: "José",
    nomeformacao: "Introdução a React",
    dataFormacao: "17/11/2022 14:00",
    justificacaoFormacao:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    idCurso: "J-F-111",
    tipoFormacao: "PENDENTE",
  },
];
