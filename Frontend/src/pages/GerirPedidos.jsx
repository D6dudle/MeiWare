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
    <div className="ml-8 mr-8">
      <h1 className="text-white font-bold text-3xl mt-8">Gerir formações</h1>
      <Tabs value="pendentes">
        {/* First value */}
        <TabsHeader className="flex gap-8 px-[0.625rem] mt-8 items-start">
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
        </TabsHeader>

        {/* Barra de pesquisa e filtros!!! */}

        <TabsBody className="mt-32">
          <div className="">
            {activeFilter !== null ? (
              <h1 className="font-bold text-2xl order-none mb-3">
                {activeFilter}
              </h1>
            ) : null}

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
        </TabsBody>
      </Tabs>
    </div>
  );
}
