import React from "react";
import { Inbox } from "react-feather";

export const EmptyState = () => {
  return (
    <div className="flex justify-center p-16">
      <div className="flex flex-col w-1/2 items-center p-8 border-primary border">
        <Inbox className="w-32 h-32 stroke-1" />
        <h3 className="text-3xl text-center font-bold p-6">
          nenhum resultado encontrado
        </h3>
        <p className="text-center text-base font-normal w-[400px] p-6 leading-6">
          tenta ajustar a tua pesquisa ou os filtros para encontrares o que
          procuras
        </p>
      </div>
    </div>
  );
};
