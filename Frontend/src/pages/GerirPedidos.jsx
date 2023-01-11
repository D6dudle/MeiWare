import React from "react";
import TrainingTabs from "../components/TrainingTabs";

export default function GerirPedidos() {
  return (
    <div className="pl-8 pr-8 flex flex-col w-full h-full overflow-y-hidden">
      <div className="pt-8">
        <h1 className="sticky top-5 text-white font-bold text-3xl">
          Gerir formações
        </h1>
      </div>
      <TrainingTabs sideBarName={"Controlo de budget"} nomeEcra={"GERIRPEDIDOS"} />
    </div>
  );
}