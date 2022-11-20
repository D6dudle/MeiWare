import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { StatsCard } from "../components/StatsCard";




export default function Formacao() {
  const percentage = 55;
  /* https://codesandbox.io/s/vymm4oln6y?file=%2FAnimatedProgressProvider.js */

  return (
    <div className="pl-8 pt-4 pr-8 w-full h-full overflow-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold">Bem vinda utilizador!</h1>
      <div className="pt-12 ">
        <h1 className="text-4xl font-bold pb-4">Dashboard Overview</h1>
        <div className="flex flex-col gap-8 justify-center md:flex-row md:justify-start md:gap-20 max-w-[600px] border-[3px] border-primary rounded pl-3 pb-4 pt-4 pr-3 ">
          <div className="flex flex-col gap-4">
            <p className="text-base text-gray3 font-bold">Orçamento restante</p>
            <p className=" text-3xl font-bold text-white ">€ 542,65</p>
            <p className="text-[9px] font-normal max-w-[140px]">
              Valor calculado após a validação de cada formação pretendida
            </p>
          </div>
          <div className="w-28 font-extrabold text-2xl">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: "white",
                pathColor: "#ECC039",
                trailColor: "#FFEFA1",
                textSize: "28px",
              })}
            />
          </div>
        </div>

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
