import React from "react";
import { Image, Edit } from "react-feather";
import { Button } from "./Button";
import Tag from "./Tag";

export const ForumTopic = ({username, dataFormacao, titulo, nomeformacao, descricao}) => {

    const arquivarPublicacaoHandler = (e) => {
        e.preventDefault();
        alert("Click em Finalizar formação");
      };

    return(
        <div className="flex-none order-none grow-0 border border-primary rounded">
            <div className="flex order-none justify-between">
                <div className="flex flex-row justify-start mt-[15px] ml-[16px] items-center">
                    <Image className="w-6 h-6 mr-4" />
                    <p className="text-sm text-white font-semibold">
                        {username} <span className="text-gray3">publicou um conteúdo </span>
                    </p>
                </div>
                <div className="flex-col items-center mr-[15px] mt-[15px]">
                    <p className="text-xs text-gray4 font-medium">Pedida em</p>
                    <p className="text-base font-normal text-white">{dataFormacao}</p>
                </div>
            </div>

            {/*Tags e Botão Arquivar Publicação */}
            <div className="flex flex-row flex-none order-1 grow-0 justify-between items-center ml-4 mt-[15px]">
                <div className="flex order-1 justify-between">
                    <div className="order-none">
                        <Tag tagName={"React"}/>
                    </div>
                    <div className="flex-none items-end order-1" onClick={arquivarPublicacaoHandler}>
                        <Button 
                            iconName={"ARQUIVAR"}
                            textButton={"Arquivar Publicação"}
                            
                        />
                    </div>
                    
                </div>
            </div>

            <div className="flex-none order-2 grow-0">
                <p className="text-white font-semibold pt-3 text-xl pl-4">
                <span className="text-gray3 text-xl ">Titulo: </span>
                {titulo}
                </p>
            </div>

            {/*Retangulo Curso Associado*/}
            <div className="flex-none order-3 grow-0 border border-primary rounded mt-[15px] ml-4 mr-[20px] mb-[15px]">
                
                <p className="text-gray3 font-bold pt-3 text-xl pl-4">
                Curso Associado
                </p>

                <div className="flex-none order-1 self-stretch pl-4 flex-row mb-[18px] font-semibold text-sm">
                    <p className="text-sm text-white font-semibold pt-3">
                        <span className="text-gray3">Nome da formação: </span>
                        {nomeformacao}
                    </p>
                </div>
            </div>

            {/*Retangulo Descrição*/}
            <div className="flex-none order-4 grow-0 border border-primary rounded mt-[15px] ml-4 mr-[20px] mb-[15px]">
                
                {/*Titulo*/}
                <p className="text-gray3 font-bold pt-3 text-xl pl-4 order-none">
                Descrição
                </p>

                {/*Texto Descricao*/}
                <div className="order-1 mr-[13px] mt-[14px] mb-4">
                    <p className="pl-4 order-1 font-medium text-xs text-justify ">
                    {descricao}
                    </p>
                </div>

            </div>
            {/*Retangulo Ficheiros Adicionados*/}
            <div className="flex-none order-5">  


            </div>

        </div>
    )
};
export default ForumTopic;