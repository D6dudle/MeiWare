import React from "react";
import { useState } from "react";
import {useLocation} from 'react-router-dom';
import FormacaoDetalhes from "../components/FormacaoDetalhes";

export const PesquisarDetalhes = ({}) => {
    const location = useLocation(); // location.state --> formacao
    console.log(location.state);

    return (
        <div className="pl-8 pr-8 h-full overflow-scroll scrollbar-hide">
            {/*Forum componente*/}                                        
            <div className="mt-4">
                    <FormacaoDetalhes
                    fornecedor={"CodeAcademy"}
                    username={location.state.username}
                    dataFormacao={location.state.dataFormacao}
                    nomeformacao={location.state.nomeformacao}
                    descricao={"Descricao formacao"}
                    justificacaoFormacao={location.state.justificacaoFormacao}
                    cursoId={location.state.idCurso}
                    preco={"79€"}
                    tags={["React", "TypeScript"]}
                    />

                </div>

        </div>
    );
}

export default PesquisarDetalhes;