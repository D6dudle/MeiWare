import React from "react";
import { Image, Edit } from "react-feather";
import { Button } from "../components/Button";
import { Formacao } from "../components/Formacao";

export const PesquisarFormacao = ({}) => {
  const corFormacao = [
    { tipo: "TERMINADA", cor: "primary" },
    { tipo: "REJEITADA", cor: "error" },
    { tipo: "CURSO", cor: "success" },
    { tipo: "PENDENTE", cor: "white" },
  ];

  const dataCard = [
    {
      username: "Jane Doe",
      nomeformacao: "Introdução a react",
      dataFormacao: "18/11/2022 14:00",
      justificacaoFormacao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      idCurso: "G-C-765",
      tipoFormacao: "CURSO",
    },
  ];


  return (
    <div className="ml-8 mr-8">
      <h1 className="text-white font-bold text-3xl mt-8 mb-8">
        Adicionar formação
      </h1>
      {dataCard?.map((card, index) => (
				<Formacao
					key={index}
					username={card.username}
					nomeformacao={card.nomeformacao}
					dataFormacao={card.dataFormacao}
					justificacaoFormacao={card.justificacaoFormacao}
					idCurso={card.idCurso}
					tipoFormacao={card.tipoFormacao}
				/>
      ))}
    </div>
  );
};
