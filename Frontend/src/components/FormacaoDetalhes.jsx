import React from "react";
import { Image, Edit } from "react-feather";
import { Button } from "./Button";
import Tag from "./Tag";
import { iconImageUpload } from "../constants/menuConstants";
import GoBackButton from "../components/GoBackButton";
import PedidoFormacaoService from "../services/pedido-formacao.service";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "./Loading";

export const FormacaoDetalhes = ({ urlBack }) => {
  const formacaoId = useLocation().search.slice(4);
  const [formacao, setFormacao] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    PedidoFormacaoService.getPedidoFormacaoById(formacaoId).then((data) => {
      setFormacao({
        fornecedor: data.formador,
        username: data.username,
        dataFormacao: data.dataFormacao,
        nomeformacao: data.nomeFormacao,
        descricao: data.descricao,
        justificacaoFormacao: data.justificacaoFormacao,
        preco: data.preco,
      });
      setLoading(false);
    });
  }, []);

  const files = [
    { type: "application/pdf", nome: "Montemor-o-Velho.pdf", size: "2,59MB" },
    { type: "image/png", nome: "Portugal.png", size: "5,58MB" },
    { type: "image/jpeg", nome: "Sporting.jpeg", size: "6,66MB" },
    { type: "application/zip", nome: "Benfica.zip", size: "11,21MB" },
  ];

  const ListarFicheiros = ({ fileType, fileName, fileSize }) => {
    const icon = iconImageUpload.find(({ type }) => type === fileType);
    return (
      <div className="flex flex-col justify-between items-start pb-4 w-full">
        <div className="flex flex-row justify-between items-center gap-4 order-none w-full">
          <div className="flex flex-row items-center mr-4">
            <icon.icon className="mr-2 flex" />
            <div className="pl-4 font-normal text-xs">
              {fileType}
              <span className="pl-3 pr-3">•</span>
              {fileName}
            </div>
          </div>
          <div className="order-1 pr-[20px]">
            <div className="flex font-normal text-xs ">{fileSize}</div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading)
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="flex-none order-none grow-0 ">
      {/*Btn voltar*/}

      <div className="flex order-none justify-between">
        {/*Titulo*/}
        <div className="flex flex-row justify-start pt-4 pl-4 items-center">
          <GoBackButton url={urlBack} />
          <p className="text-white font-semibold pt-3 text-xl pl-4 pb-4">
            <span className="text-gray3 text-xl ">Titulo: </span>
            {formacao.nomeformacao}
          </p>
        </div>
        {/*pedida em*/}
        <div className="flex-row-reverse items-center pr-4 pt-4">
          <p className="text-xs text-gray4 font-medium">Pedida em</p>
          <p className="text-base font-normal text-white">
            {formacao.dataFormacao}
          </p>
        </div>
      </div>

      {/*Pessoa publicou uma formacao*/}
      <div className="flex order-none justify-between">
        <div className="flex flex-row justify-start pt-4 pl-4 items-center">
          <Image className="w-6 h-6 mr-4" />
          <p className="text-sm text-white font-semibold">
            {formacao.username}{" "}
            <span className="text-gray3">publicou uma formação </span>
          </p>
        </div>
      </div>

      {/*
      <div className="flex flex-row order-1 justify-between items-center pl-4 pt-4 pr-4">
        <div className="flex order-1 justify-between w-full">
          <div className="flex gap-4">
            {tags.map((tag, index) => (
              <Tag key={tag} tagName={tag} />
            ))}
          </div>
        </div>
      </div> */}

      {/*Retangulo Fornecedor*/}
      <div className="flex flex-row order-3 grow-0 border border-primary rounded pt-4 ml-4 mt-4 mr-[20px] mb-4 justify-between">
        <div className="flex flex-col items-start order-none ">
          <p className="order-none text-gray3 font-bold pt-3 text-xl pl-4 ">
            Fornecedor
          </p>

          <div className="flex-none order-1 self-stretch pl-4 flex-row pb-[18px] font-semibold text-sm">
            <p className="text-sm text-white font-semibold pt-3">
              <span className="text-gray3">Nome: </span>
              {formacao.fornecedor}
            </p>
          </div>
        </div>
        {/* Preço*/}
        <div className="flex-none order-1 pr-[18px] pt-[19px] pb-[24px] pl-[14px]">
          <p className="text-xs text-gray4 font-medium">preço</p>
          <p className="text-base font-normal text-white">{formacao.preco}</p>
        </div>
        {/* Course ID*/}
        <div className="flex-none order-1 pr-[18px] pt-[19px] pb-[24px] pl-[14px]">
          <p className="text-xs text-gray4 font-medium">Course ID</p>
          <p className="text-base font-normal text-white">{formacaoId}</p>
        </div>
      </div>

      {/*Retangulo Descrição*/}
      <div className="flex-none order-4 grow-0 border border-primary rounded pt-4 ml-4 mr-[20px] pb-4 mb-4">
        {/*Titulo*/}
        <p className="text-gray3 font-bold pt-3 text-xl pl-4 order-none">
          Descrição
        </p>

        {/*Texto Descricao*/}
        <div className="order-1 pr-4 pt-4 mb-4">
          <p className="pl-4 order-1 font-medium text-xs text-justify ">
            {formacao.descricao}
          </p>
        </div>
      </div>

      {/*Retangulo Justificação da Formação*/}
      <div className="flex-none order-4 grow-0 border border-primary rounded pt-4 ml-4 mr-[20px] pb-4">
        {/*Titulo*/}
        <p className="text-gray3 font-bold pt-3 text-xl pl-4 order-none">
          Justificação da formação
        </p>

        {/*Texto Descricao*/}
        <div className="order-1 pr-4 pt-4 mb-4">
          <p className="pl-4 order-1 font-medium text-xs text-justify ">
            {formacao.justificacaoFormacao}
          </p>
        </div>
      </div>

      {/*Retangulo Ficheiros Adicionados*/}
      <div className="mt-2">
        <p className="text-gray3 font-bold pt-3 text-xl pl-4 order-none">
          Anexos
        </p>
      </div>
      <div className="flex flex-none order-5 pt-4">
        {files.length > 0 && (
          <div className="w-full pl-4">
            {files?.map((file, index) => (
              <ListarFicheiros
                key={index}
                fileType={file.type}
                fileName={file.nome}
                fileSize={file.size}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default FormacaoDetalhes;
