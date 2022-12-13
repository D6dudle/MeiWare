import React, { useState } from "react";
import { Button } from "./Button";

export default function Modal({ closeModal, confirmeActionModal, data }) {
  const constDataModal = [
    {
      tipo: "CANCELAR",
      header: "Tem a certeza que quer cancelar a formação?",
      body: "todas as alterações e documentos serão ",
      boldWord: "apagados ",
      body2: "e não vai ser possível consultar mais esta formação",
    },
    {
      tipo: "EXCLUIR",
      header: "Tem a certeza que quer excluir o colaborador?",
      body: "toda a informação acerca deste colaborador será",
      boldWord: "apagada ",
      body2: "e não vai ser possível consultar mais esta formação",
    },
  ];

  const prepareConfirmeActionModal = () => {
    if (!justificacaoFormacao.data) {
      //If its empty
      setJustificacaoFormacao({ ...justificacaoFormacao, error: true });
      setIsSubmit(true);
    } else {
      confirmeActionModal();
    }
  };

  const [justificacaoFormacao, setJustificacaoFormacao] = useState({
    data: "",
    error: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const dataModal = constDataModal.find(({ tipo }) => tipo == data);

  return (
    <div className="flex justify-center items-center w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none filter backdrop-blur-sm">
      <div className="flex w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border border-white rounded-md shadow-lg relative flex flex-col w-full bg-black2 outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5  rounded-t">
            <h3 className="pl-6 text-2xl font-bold text-white">
              {dataModal?.header}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => closeModal()}
            >
              <span className="bg-transparent text-white  h-6 w-6 text-2xl flex justify-center items-center outline-none focus:outline-none hover:scale-125 hover:text-error ">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <p className="text-center py-4 text-white text-base font-normal leading-relaxed">
              {dataModal.body}
              <span className="text-primary"> {dataModal?.boldWord} </span>{" "}
              {dataModal?.body2}
            </p>
            <div className="pl-6">
              <h3 className="flex font-bold pb-4 text-primary">
                Qual o motivo do cancelamento?
              </h3>
              <input
                type="text"
                className={`inputText ${
                  justificacaoFormacao.data || isSubmit === false
                    ? null
                    : "border-error"
                }`}
                id="nomeFormacao"
                placeholder="descrição da justificação"
                onChange={(e) => {
                  setJustificacaoFormacao({
                    ...justificacaoFormacao,
                    data: e.target.value,
                  });
                }}
                value={justificacaoFormacao.data}
              />
              {justificacaoFormacao.error && (
                <p className="inputTextErrors pt-2">
                  Justifique a razão do cancelamento
                </p>
              )}
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end gap-4 p-6  rounded-b">
            <Button
              className="pl-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              iconName="NONE"
              textButton="voltar"
              handleClick={() => closeModal()}
            />
            <Button
              className="pl-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              iconName="NONE_PRIMARY"
              textButton="sim, tenho"
              handleClick={() => prepareConfirmeActionModal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
