import React from "react";
import { ChevronsUp } from "react-feather";
import { LineChart } from "../components/LineChart";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


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
        
      </div>
      {/* Gráfico de linhas !!*/}
      <div className="w-40">
        <LineChart />
      </div>
    </div>
  );
};

export const StatsLargeCard = ({titulo, montante, descricao, percentagem}) => {
  return(
    <div className="flex flex-col gap-8 justify-center items-center md:flex-row md:justify-start md:gap-20 max-w-[600px] border-[3px] border-primary rounded pl-3 pb-4 pt-4 pr-3 ">
          <div className="flex flex-col gap-4">
            <p className="text-base text-gray3 font-bold">{titulo}</p>
            <p className=" text-3xl font-bold text-white ">{montante}</p>
            <p className="text-[9px] font-normal max-w-[160px]">
             {descricao}
            </p>
          </div>
          <div className="w-28 font-extrabold text-2xl">
            <CircularProgressbar
              value={percentagem}
              text={`${percentagem}%`}
              styles={buildStyles({
                textColor: "white",
                pathColor: "#ECC039",
                trailColor: "#FFEFA1",
                textSize: "28px",
              })}
            />
          </div>
        </div>
  )
}
