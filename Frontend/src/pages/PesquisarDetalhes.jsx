import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import FormacaoDetalhes from "../components/FormacaoDetalhes";

export const PesquisarDetalhes = ({}) => {
  const location = useLocation(); // location.state --> formacao

  return (
    <div className="pl-8 pr-8 h-full overflow-scroll scrollbar-hide">
      {/*Forum componente*/}
      <div className="mt-4">
        <FormacaoDetalhes urlBack={location.state.prevUrl} />
      </div>
    </div>
  );
};

export default PesquisarDetalhes;
