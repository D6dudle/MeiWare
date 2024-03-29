import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PublicacaoDetalhes } from "../components/PublicacaoDetalhes";

export const PesquisarForumConsulta = ({}) => {
  const location = useLocation(); // location.state --> formacao

  return (
    <div className="pl-8 pr-8 h-full overflow-scroll scrollbar-hide">
      {/*Forum componente*/}
      <div className="mt-4">
        <PublicacaoDetalhes
          titulo={location.state.titulo}
          username={location.state.username}
          dataPublicacao={location.state.dataPublicacao}
          nomeFormacao={location.state.nomeFormacao}
          descricao={location.state.descricao}
          justificacaoFormacao={location.state.justificacaoFormacao}
          publicacaoId={location.state.publicacaoId}
          tags={location.state.tags}
          urlBack={location.state.urlBack}
          files={location.state.files}
        />
      </div>
    </div>
  );
};

export default PesquisarForumConsulta;
