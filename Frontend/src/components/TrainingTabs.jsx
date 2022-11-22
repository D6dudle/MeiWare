import React, { useState } from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import TextInput from "../components/TextInput";
import { Formacao } from "../components/Formacao";
import { Formacoes } from "../constants/formacoes";
import DateOrder from "./DateOrder";

export default function TrainingTabs() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filter, setFilter] = useState(null);

  const [search, setSearch] = useState();

  const handleType = (index, event) => {
    setSearch(event.target.value);
  };

  return (
    <Tabs
      value="pendentes"
      className="flex flex-col tabsHeader scrollbar-hide pr-5"
    >
      {/* First value */}
      <TabsHeader className="mt-0">
        <div className="flex items-start gap-8 px-[0.625rem]">
          {Formacoes.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className={`w-fit pb-2 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary ${
                label == activeFilter && "text-primary border-primary"
              }`}
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

      <div className="flex flex-row gap-4">
        <div className="w-80 justify-start mb-4">
          <TextInput
            index={1}
            name={"pesquisa..."}
            type={"searchbar"}
            callback={handleType}
          />
        </div>
        <DateOrder />
      </div>

      <TabsBody className="w-full h-full overflow-y-scroll scrollbar-hide">
        <div className="overflow-y-visible">
          {activeFilter !== null ? (
            <h1 className="font-bold text-2xl order-none mb-3">
              {activeFilter}
            </h1>
          ) : null}
          <div className="overflowy-y-visible flex flex-nowrap justify-between flex-col gap-3">
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
  );
}
