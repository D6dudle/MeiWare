import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Formacao } from "../components/Formacao";
import { Formacoes } from "../constants/formacoes";

export default function GerirPedidos() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filter, setFilter] = useState(null);

  return (
    <div className="pl-8 pr-8 w-full h-full overflow-hidden">
      <div className="pt-8">
        <h1 className="sticky top-5 text-white font-bold text-3xl">Gerir formações</h1>
      </div>
      <Tabs value="pendentes" className="tabsHeader scrollbar-hide pr-5">
        {/* First value */}
        <TabsHeader className="mt-0">
          <div className="flex items-start gap-8 px-[0.625rem]">
          {Formacoes.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className="w-fit border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary"
              onClick={() => {
                setActiveFilter(label);
                var list = Formacoes.filter((item) => item.label == label);
                setFilter(list[0].formacoes);
              }}
            >
              <div className="gap-2 flex flex-row justify-between items-center">
                {icon}
                {label}
              </div>
            </Tab>
          ))}
          </div>
        </TabsHeader>

        {/* Barra de pesquisa e filtros!!! */}

        <TabsBody className="w-full h-full mt-5">
          <div className="w-full h-full overflow-scroll scrollbar-hide">
            {activeFilter !== null ? (
              <h1 className="font-bold text-2xl order-none mb-3">
                {activeFilter}
              </h1>
            ) : null}
            <div className="flex flex-nowrap justify-between flex-col gap-3">
            {activeFilter !== null
              ? filter.map((card, index) => {
                  return (
                    <Formacao
                      key={index}
                      username={card.username}
                      nomeformacao={card.nomeformacao}
                      dataFormacao={card.dataFormacao}
                      justificacaoFormacao={card.justificacaoFormacao}
                      idCurso={card.idCurso}
                      tipoFormacao={card.tipoFormacao}
                      consultar={true}
                    />
                  );
                })
              : null}
            </div>
          </div>
        </TabsBody>
      </Tabs>
    </div>
  );
}
