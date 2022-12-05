import React from "react";
import { Button } from "../components/Button";
import { Image, Edit } from "react-feather";
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';

export const Formacao = ({
  username,
  nomeformacao,
  dataFormacao,
  justificacaoFormacao,
  idCurso,
  tipoFormacao,
  consultar,
}) => {
  const corFormacao = [
    { tipo: "TERMINADA", cor: "primary" },
    { tipo: "REJEITADA", cor: "error" },
    { tipo: "CURSO", cor: "success" },
    { tipo: "PENDENTE", cor: "white" },
  ];

  const corFormacaoBorder = corFormacao.find(
    ({ tipo }) => tipo == tipoFormacao
  );

  const navigate = useNavigate();

  const handleConsultarFormacaoClick = (e, formacao) => {
    e.preventDefault();
    navigate(`/home/formacao/pesquisar-detalhes`, {state:formacao});
  };

  const handleEditarFormacaoClick = (e) => {
    e.preventDefault();
    alert("Click em Editar formação");
  };

  const handleCancelarFormacaoClick = (e) => {
    e.preventDefault();
    alert("Click em Cancelar formação");
  };

  const handleFinalizarFormacaoClick = (e) => {
    e.preventDefault();
    alert("Click em Finalizar formação");
  };

  return (
    <>
      {tipoFormacao !== "REJEITADA" ? (
        <div
          className={`flex flex-col h-fit border border-${corFormacaoBorder?.cor} pl-4 pb-4 mb-8 rounded`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start mt-4 ">
            <div className="flex flex-row justify-start items-start">
              <Image className="w-6 h-6 mr-4" />
              <p className="text-sm text-white font-semibold">
                {username} <span className="text-gray3">começou uma </span>
                nova formação
              </p>
            </div>

            <div className="flex flex-row gap-4 mr-4 pt-4 md:pt-0">
              {consultar ? (
                <div className="" onClick={e => handleConsultarFormacaoClick(e, {
                  username,
                  nomeformacao,
                  dataFormacao,
                  justificacaoFormacao,
                  idCurso,
                  tipoFormacao,
                  consultar,
                })}>
                  <Button className="h-10" iconName="CONSULTAR" textButton="" />
                </div>
              ) : null}
              <div className="" onClick={() => {
                                  const params = {
                                    id: idCurso,
                                  };

                                  navigate(
                                    {
                                      pathname: "/home/formacao/pesquisar-formacao/editar-formacao",
                                      search: createSearchParams(params).toString(),
                                    },
                                    {
                                      state: {
                                        prevUrl: location.pathname,
                                        
                                      },
                                    }
                                  );
                                }}>
                <Button
                  className="h-10"
                  iconName="EDITAR"
                  textButton="editar formação"
                />
              </div>
              <div
                className={`${tipoFormacao !== "TERMINADA" ? null : "hidden"}`}
                onClick={handleCancelarFormacaoClick}
              >
                <Button
                  className=""
                  iconName="CANCELAR"
                  textButton="cancelar"
                />
              </div>
              <div
                className={`${tipoFormacao === "CURSO" ? null : "hidden"}`}
                onClick={handleFinalizarFormacaoClick}
              >
                <Button
                  className="h-10"
                  iconName="FINALIZAR"
                  textButton="finalizar"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-white font-semibold pt-3">
              <span className="text-gray3">Nome da formação: </span>
              {nomeformacao}
            </p>
          </div>
          <div className="flex pt-3 gap-10 ">
            <div className="flex flex-col">
              <p className="text-xs text-gray4 font-medium">Pedida em</p>
              <p className="text-base font-normal text-white">{dataFormacao}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray4 font-medium">
                Informação adicional
              </p>
              <p className="text-base font-normal text-white text-ellipsis overflow-hidden whitespace-nowrap w-20 md:w-80	 ">
                {justificacaoFormacao}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-gray4 font-medium">Id Formação</p>
              <p className="text-base font-normal text-white">{idCurso}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Formacao;
