import React, { useState } from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import TextInput from "../components/TextInput";
import { Formacao } from "../components/Formacao";
import { Formacoes } from "../constants/formacoes";
import DateOrder from "./DateOrder";
import AproveOrder from "./AproveOrder";
import users from "../constants/usersAux.json";

export default function TrainingTabs() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filter, setFilter] = useState(null);

  const [search, setSearch] = useState();
  const [values, setValues] = useState([]);

  const filterTags = (inputValue) => {
    return users.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleType = (index, event) => {
    setSearch(event.target.value);
  };

  const handleDropdown = (index, opt) => {
    let data = [...values];
    data[index] = opt;
    setValues(data);
  };

  const handleCancelarFormacao = (card) => {
    setDataCardList(
      dataCardList.filter((data) => data.idCurso !== card.idCurso)
    );
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
        <div className="flex flex-row h-fit justify-between items-center gap-8">
          <TextInput
            index={1}
            name={"pesquisa..."}
            type={"searchbar"}
            style={"w-[30rem]"}
            showTitle={false}
            callback={handleType}
            value={search}
          />
          <div>
            <TextInput
              index={1}
              name={"colaborador"}
              type="dropsearch"
              titleStyle={"font-bold mb-1 text-2xl"}
              style={"w-[30rem]"}
              placeholder="colaborador..."
              list={users}
              multi={true}
              showTitle={false}
              error={"Por favor selecione ou adicione um nome"}
              value={values[1]}
              callback={handleDropdown}
              searchCall={filterTags}
            />
          </div>
          <div className="flex justify-center items-center">
            <DateOrder />
            {activeFilter === "Formações pendentes" && <AproveOrder />}
          </div>
        </div>
      </div>

      <TabsBody className="w-full h-full overflow-y-scroll scrollbar-hide mt-2">
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
                      urlBack={"/home/formacao/listar-formacao"}
                      onItemDelete={() => handleCancelarFormacao(card)}
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
