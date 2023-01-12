import { useState, useEffect } from "react";
import { Image, Edit } from "react-feather";
import { Button } from "./Button";
import Tag from "./Tag";
import { iconImageUpload } from "../constants/menuConstants";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export const ForumTopic = ({
  username,
  dataPublicacao,
  titulo,
  nomeFormacao,
  descricao,
  formacaoId,
  anexos,
  tags,
  arquivar = true,
  aprovar = false,
  urlBack,
  onForumTopicArchive,
}) => {
  const navigate = useNavigate();
  const [modalArquivar, setModalArquivar] = useState({
    show: false,
    data: null,
  });

  const [modalRejeitar, setModalRejeitar] = useState({
    show: false,
    data: null,
  });

  const files = [
    { type: "application/pdf", path: "AncoraPraia.pdf", size: "2,59MB" },
    { type: "image/png", path: "Ancorense.png", size: "2,59MB" },
    { type: "image/jpeg", path: "Porto.jpeg", size: "2,59MB" },
    { type: "application/zip", path: "Benfica.zip", size: "2,59MB" },
  ];

  const ListarFicheiros = ({ fileType, fileName, fileSize }) => {
    const icon = iconImageUpload.find(({ type }) => type === fileType);
    
    return (
      <div className="flex flex-col justify-between items-start pb-4 w-full">
        <div className="flex flex-row justify-between items-center gap-4 order-none w-full">
          <div className="flex flex-row items-center mr-4">
            {icon != null && (<icon.icon className="mr-2 flex" />)}
            <div className="pl-4 font-normal text-xs">{fileName} •</div>
          </div>
          <div className="order-1 pr-[20px]">
            <div className="flex font-normal text-xs ">{fileSize}</div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("Mudança no modal para " + modalArquivar.show);
  }, [modalArquivar]);

  const handleCloseModalArquivar = () => {
    setModalArquivar({ show: false, data: null });
    console.log("cliquei no fechar!");
  };

  const handleCloseModalRejeitar = () => {
    setModalRejeitar({ show: false, data: null });
  };

  const confirmeActionModal = () => {
    console.log("Vou arquivar a formação");
    setModalArquivar({ show: false, data: null });
    onForumTopicArchive();
  };

  const confirmeActionModalRejeitar = () => {
    console.log("Vou rejeitar a formação");
    onForumTopicArchive();
    setModalRejeitar({ show: false, data: null });
  };

  const verPublicacaoHandler = (e, formacao) => {
    e.preventDefault();
    navigate(`/home/knowledge/ver-publicacao-completa`, { state: formacao });
  };

  const handleRejeitarPublicacaoClick = (e) => {
    e.preventDefault();
    setModalRejeitar({
      show: true,
      data: "REJEITAR",
    });
  };

  const handleArquivarPublicacaoClick = (e) => {
    e.preventDefault();
    setModalArquivar({
      show: true,
      data: "REJEITAR",
    });
  };

  return (
    <div className="flex-none order-none grow-0 border border-primary rounded">
      <div className="flex order-none justify-between">
        <div className="flex flex-row justify-start pt-4 pl-4 items-center">
          <Image className="w-6 h-6 mr-4" />
          <p className="text-sm text-white font-semibold">
            {username} <span className="text-gray3">fez uma publicacao </span>
          </p>
        </div>
        <div className="flex-col items-center pr-4 pt-4">
          <p className="text-xs text-gray4 font-medium">Publicada em</p>
          <p className="text-base font-normal text-white">{dataPublicacao}</p>
        </div>
      </div>

      {/*Tags e Botão Arquivar Publicação */}
      <div className="flex flex-row order-1 justify-between items-center pl-4 pt-4 pr-4">
        <div className="flex order-1 justify-between w-full">
          <div className="flex gap-4">
            {tags.map((tag) => (
              <Tag key={tag} tagName={tag}/>
            ))}
          </div>
          <div style={{ display: arquivar ? "block" : "none" }}>
            <Button
              iconName={"ARQUIVAR"}
              textButton={"Arquivar Publicação"}
              handleClick={handleArquivarPublicacaoClick}
            />
            {modalArquivar.show && (
              <Modal
                closeModal={handleCloseModalArquivar}
                confirmeActionModal={confirmeActionModal}
                data={modalArquivar.data}
              />
            )}
          </div>
        </div>
      </div>

      {/*Titulo*/}
      <div className="flex-none order-2 grow-0">
        <p className="text-white font-semibold pt-3 text-xl pl-4 pb-4">
          <span className="text-gray3 text-xl ">Titulo: </span>
          {titulo}
        </p>
      </div>

      {/*Retangulo Descrição*/}
      <div className="flex-none order-4 grow-0 border border-primary rounded pt-4 ml-4 mr-[20px] pb-4">
        {/*Titulo*/}
        <p className="text-gray3 font-bold pt-3 text-xl pl-4 order-none">
          Descrição
        </p>

        {/*Texto Descricao*/}
        <div className="order-1 pr-4 pt-4 mb-4">
          <p className="pl-4 order-1 font-medium text-xs text-justify ">
            {descricao}
          </p>
        </div>
      </div>
      
      {/*Retangulo Curso Associado*/}
      <div className="flex flex-row order-3 grow-0 border border-primary rounded pt-4 ml-4 mr-[20px] mb-4">
        <div className="flex flex-col items-start order-none w-4/5">
          <p className="order-none text-gray3 font-bold pt-3 text-xl pl-4 ">
            Formação Associada
          </p>

          <div className="flex-none order-1 self-stretch pl-4 flex-row pb-[18px] font-semibold text-sm">
            <p className="text-sm text-white font-semibold pt-3">
              <span className="text-gray3">Nome da formação: </span>
              {nomeFormacao}
            </p>
          </div>
        </div>
        {/* Form ID <div className="flex-none order-1 pr-[18px] pt-[19px] pb-[24px] pl-[14px]">
          <p className="text-xs text-gray4 font-medium">ID da Formação</p>
          <p className="text-base font-normal text-white">{formacaoId}</p>
        </div>*/}
      </div>

      {/*Retangulo Ficheiros Adicionados*/}
      <div className="flex flex-none order-5 pt-4">
        {anexos.length > 0 && (
          <div className="w-full pl-4">
            {anexos.map((file) => (
              <ListarFicheiros
                key={file.nome}
                fileName={file.nome}
                fileSize={file.size}
                fileType={file.type}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-none order-6 pr-[20px] pl-4 pb-3 gap-4">
        <div
          className="flex flex-row justify-end items-center w-full "
          onClick={(e) =>
            verPublicacaoHandler(e, {
              username,
              dataPublicacao,
              titulo,
              nomeFormacao,
              descricao,
              formacaoId,
              urlBack,
            })
          }
        >
          <Button
            iconName={"CONSULTAR"}
            textButton={"Ver Publicação Completa"}
          />
        </div>
        <div
          className="flex flex-row justify-between gap-4"
          style={{ display: aprovar ? "flex" : "none" }}
        >
          <Button
            iconName={"CANCELAR"}
            textButton={"Rejeitar"}
            handleClick={handleRejeitarPublicacaoClick}
          />
          {modalRejeitar.show && (
            <Modal
              closeModal={handleCloseModalRejeitar}
              confirmeActionModal={confirmeActionModalRejeitar}
              data={modalRejeitar.data}
            />
          )}
          <Button iconName={"FINALIZAR"} textButton={"Aprovar"} />
        </div>
      </div>
    </div>
  );
};
export default ForumTopic;
