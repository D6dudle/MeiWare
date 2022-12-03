import React from "react";
import { StatsCard, StatsLargeCard } from "../components/StatsCard";
import { getDataUsers, getColumnsTable } from "../constants/tabelaUtilizadores";
import Table from "../components/TableComponent/Table";

export default function ControloBudget() {
  const data = React.useMemo(() => getDataUsers(), []);
  const columns = React.useMemo(() => getColumnsTable(), []);

  return (
    <div className="pl-8 pt-8 pr-8 w-full h-full overflow-scroll scrollbar-hide">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="pt-8">
        <StatsLargeCard
          titulo="Orçamento atual da empresa"
          montante="€ 5420,65"
          descricao="Valor calculado através da soma de todos os colaboradores da empresa"
          percentagem={55}
        />
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/** @MakeComponent : fazer desta DIV um componente de estatisticas*/}
          <StatsCard
            titulo="Gastos Totais"
            valor="€ 4570,35"
            valorAumento="€ 37,99"
          />
          <StatsCard
            titulo="Formações realizadas"
            valor="40"
            valorAumento="67%"
          />
          <StatsCard titulo="Novas Formações" valor="9" valorAumento="60%" />
        </div>
      </div>
      <div className="pt-4 mx-auto">
      <Table columns={columns} data={data} />
      </div>

    </div>
  );
}
