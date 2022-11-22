import React from "react";
import { StatsCard, StatsLargeCard } from "../components/StatsCard";




export default function Formacao() {
  /* https://codesandbox.io/s/vymm4oln6y?file=%2FAnimatedProgressProvider.js */

  return (
    <div className="pl-8 pt-4 pr-8 w-full h-full overflow-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold">Bem vinda utilizador!</h1>
      <div className="pt-12 ">
        <h1 className="text-4xl font-bold pb-4">Dashboard Overview</h1>
        <StatsLargeCard
          titulo='Orçamento restante'
          montante='€ 542,65'
          descricao='Valor calculado após a validação de cada formação pretendida'
          percentagem={55}
        />
        <div className="flex flex-col lg:flex-row lg:gap-8">
        {/** @MakeComponent : fazer desta DIV um componente de estatisticas*/ }
        <StatsCard
          titulo='Gastos Totais'
          valor= '€ 457,35'
          valorAumento='€ 37,99'
        />
        <StatsCard
          titulo='Formações realizadas'
          valor= '4'
          valorAumento='100%'
        />
        <StatsCard
          titulo='Novas Formações'
          valor= '2'
          valorAumento='2'
        />

        </div>
        
      </div>
      <h1 className="pt-8">Colocar aqui o componente de listar formações pendentes/curso/terminadas deste utilizador</h1>
    </div>
  );
}
