import React from "react";
import { Button } from "./Button";

export default function Modal({ closeModal, confirmeActionModal, data }) {
  const constDataModal = [
    {
      tipo: "CANCELAR",
      header: "Tem a certeza que quer cancelar a formação?",
      body: "todas as alterações e documentos serão ",
      boldWord: "apagadas ",
      body2: "e não vai ser possível consultar mais esta formação",
    },
    { tipo: "REJEITADA", cor: "error" },
    { tipo: "CURSO", cor: "success" },
    { tipo: "PENDENTE", cor: "white" },
  ];

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
            <p className="text-center my-4 text-white text-base font-normal leading-relaxed">
              {dataModal.body}
              <span className="text-primary"> {dataModal?.boldWord} </span>{" "}
              {dataModal?.body2}
            </p>
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
              handleClick={() => confirmeActionModal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
