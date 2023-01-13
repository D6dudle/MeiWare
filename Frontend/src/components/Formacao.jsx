import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Image, Edit } from "react-feather";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import Modal from "./Modal";
import UserService from "../services/user.service";

export const Formacao = ({
  username,
  nomeFormacao,
  dataFormacao,
  justificacaoFormacao,
  idCurso,
  tipoFormacao,
  consultar,
  urlBack,
  onItemDelete,
  sidebarName,
  onAceitarclick,
  onFinalizarClick,
  nomeEcra,
}) => {
  const [modal, setModal] = useState({ show: false, data: null });

  //Não e preciso mas também não é um problema
  const user = UserService.getCurrentUser();
  if (nomeEcra == "LISTARFORMACOES") {
    username = user.nome;
  }

  const handleCloseModal = () => {
    setModal({ show: false, data: null });
  };

  const confirmeActionModal = (justificacaoFormacao) => {
    onItemDelete(justificacaoFormacao);
    setModal({ show: false, data: null });
  };

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
    navigate(`/home/formacao/pesquisar-detalhes`, { state: formacao });
  };

  const handleCancelarFormacaoClick = (e) => {
    e.preventDefault();
    setModal({
      show: true,
      data: "CANCELAR",
    });
  };

  const handleAceitarFormacaoClick = (e) => {
    e.preventDefault();
    onAceitarclick();
  };

  const handleFinalizarFormacaoClick = (e) => {
    e.preventDefault();
    onFinalizarClick();
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
                <div
                  className=""
                  onClick={(e) =>
                    handleConsultarFormacaoClick(e, {
                      username,
                      nomeFormacao,
                      dataFormacao,
                      justificacaoFormacao,
                      idCurso,
                      tipoFormacao,
                      consultar,
                      urlBack,
                    })
                  }
                >
                  <Button className="h-10" iconName="CONSULTAR" textButton="" />
                </div>
              ) : null}
              <div
                className=""
                onClick={() => {
                  const params = {
                    id: idCurso,
                  };

                  navigate(
                    {
                      pathname: window.location.pathname + "/editar-formacao",
                      search: createSearchParams(params).toString(),
                    },
                    {
                      state: {
                        prevUrl: location.pathname,
                      },
                    }
                  );
                }}
              >
                <Button
                  className="h-10"
                  iconName="EDITAR"
                  textButton="editar formação"
                />
              </div>
              {sidebarName === "Controlo de budget" &&
              tipoFormacao === "PENDENTE" ? (
                <div>
                  <Button
                    className="h-10"
                    iconName="FINALIZAR"
                    textButton="aceitar"
                    handleClick={handleAceitarFormacaoClick}
                  />
                </div>
              ) : null}
              <div
                className={`${tipoFormacao !== "TERMINADA" ? "" : "hidden"}`}
                //onClick={() => handleCancelarFormacaoClick}
              >
                <Button
                  className=""
                  iconName="CANCELAR"
                  textButton="cancelar"
                  handleClick={handleCancelarFormacaoClick}
                />
                {modal.show && (
                  <Modal
                    closeModal={handleCloseModal}
                    confirmeActionModal={confirmeActionModal}
                    data={modal.data}
                  />
                )}
              </div>
              <div
                className={`${tipoFormacao === "CURSO" ? null : "hidden"}`}
                //onClick={handleFinalizarFormacaoClick}
              >
                <Button
                  className="h-10"
                  iconName="FINALIZAR"
                  textButton="finalizar"
                  handleClick={handleFinalizarFormacaoClick}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-white font-semibold pt-3">
              <span className="text-gray3">Nome da formação: </span>
              {nomeFormacao}
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
