import { AlertCircle, Zap, Check } from "react-feather";

export const Formacoes = [
  {
    label: "Formações pendentes",
    value: "pendentes",
    icon: <AlertCircle />,
    formacoes: [
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react 1",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "P-C-765",
        tipoFormacao: "PENDENTE",
      },
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react 2",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "P-C-766",
        tipoFormacao: "PENDENTE",
      },
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react 3",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "P-C-767",
        tipoFormacao: "PENDENTE",
      },
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react 4",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "P-C-768",
        tipoFormacao: "PENDENTE",
      },
    ],
  },
  {
    label: "Formações a decorrer",
    value: "decorrer",
    icon: <Zap />,
    formacoes: [
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "C-C-765",
        tipoFormacao: "CURSO",
      },
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "C-C-766",
        tipoFormacao: "CURSO",
      },
    ],
  },

  {
    label: "Formações terminadas",
    value: "terminadas",
    icon: <Check />,
    formacoes: [
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "T-C-765",
        tipoFormacao: "TERMINADA",
      },
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "T-C-766",
        tipoFormacao: "TERMINADA",
      },
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "T-C-767",
        tipoFormacao: "TERMINADA",
      },
      {
        username: "Jane Doe",
        nomeformacao: "Introdução a react",
        dataFormacao: "18/11/2022 14:00",
        justificacaoFormacao:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        idCurso: "T-C-768",
        tipoFormacao: "TERMINADA",
      },
    ],
  },
];
