import React from "react";
import { ChevronsUp } from "react-feather";
import { LineChart } from "../components/LineChart";


export const StatsCard = ({titulo, valor, valorAumento}) => {
  return (
    <div className="flex flex-col gap-2 justify-center md:flex-row md:justify-start md:gap-10 w-fit border-[3px] border-primary rounded pl-3 pb-4 pt-4 pr-3 mt-4">
      <div className="flex flex-col gap-4">
        <p className="text-base text-gray3 font-bold">{titulo}</p>
        <p className=" text-xl font-bold text-primary ">{valor}</p>
        <div className="flex justify-center items-center">
          <ChevronsUp />
          <span className="text-xs font-normal text-pastel">
            + {valorAumento} <span className="text-white"> (mês passado)</span>{" "}
          </span>
        </div>
        {/* Gráfico de linhas !!*/}
      </div>
      <div className="w-40">
        <LineChart />
      </div>
    </div>
  );
};
