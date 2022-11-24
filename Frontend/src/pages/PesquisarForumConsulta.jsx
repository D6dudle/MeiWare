import React from "react";
import { useState } from "react";
import {useLocation} from 'react-router-dom';
import ConsultaDetalhes from "../components/ConsultaDetalhes";

export const PesquisarForumConsulta = ({}) => {
    const location = useLocation(); // location.state --> formacao

    return (
        <div className="pl-8 pr-8 h-full overflow-scroll scrollbar-hide">
            {/*Forum componente*/}                                        
            <div className="mt-4">
                    <ConsultaDetalhes
                    titulo={location.state.titulo}
                    username={location.state.username}
                    dataFormacao={location.state.dataFormacao}
                    nomeformacao={location.state.nomeformacao}
                    descricao={location.state.descricao}
                    justificacaoFormacao={location.state.justificacaoFormacao}
                    cursoId={location.state.cursoId}
                    preco={"79€"}
                    tags={["ReactJS", "Frontend"]}
                    urlBack={location.state.urlBack}
                    />

                </div>

        </div>
    );
}

export default PesquisarForumConsulta;