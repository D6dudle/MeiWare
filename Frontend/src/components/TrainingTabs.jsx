import React, { useState, useEffect } from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import TextInput from "../components/TextInput";
import { Formacao } from "../components/Formacao";
import { Formacoes } from "../constants/formacoes";
import DateOrder from "./DateOrder";
import AproveOrder from "./AproveOrder";
import users from "../constants/usersAux.json";
import { EmptyState } from "./EmptyState";

export default function TrainingTabs({ sideBarName }) {
  const [originalList, setOriginalList] = useState(Formacoes);
  const [filteredList, setFilteredList] = useState(originalList[0].formacoes);

  const [colabList, setColabList] = useState(users);

  const [activeFilter, setActiveFilter] = useState(null);
  const [dateSortIncreasing, setDateSort] = useState(false);

  const [search, setSearch] = useState();
  const [values, setValues] = useState([]);

  const handleCancelarFormacao = (card) => {
    //Gets the index of object to remove the formation
    const indexList = originalList.findIndex((element) => {
      return element.label === activeFilter;
    });

    const updatedList = originalList[indexList].formacoes.filter(
      (formacao) => formacao.idCurso !== card.idCurso
    );

    var tempData = [...originalList];
    tempData[indexList].formacoes = updatedList;
    setOriginalList(tempData);

    setFilteredList(updatedList);
  };

  const handleAceitarFormacaoPendente = (card) => {
    //Igual ao handleCancelarFormacao (remove o elemento da lista)
    //Gets the index of object to remove the formation
    const indexList = originalList.findIndex((element) => {
      return element.label === activeFilter;
    });

    const updatedList = originalList[indexList].formacoes.filter(
      (formacao) => formacao.idCurso !== card.idCurso
    );

    const indexFormacaoDecorrer = originalList.findIndex((element) => {
      return element.label === "Formações a decorrer";
    });

    var tempData = [...originalList];
    tempData[indexList].formacoes = updatedList;

    //Passar a formação atual para a formação a decorrer
    card.tipoFormacao = "CURSO";
    tempData[indexFormacaoDecorrer].formacoes.push(card);
    setOriginalList(tempData);
    setFilteredList(updatedList);
  };

  useEffect(() => {
    console.log("Update");
    console.log(originalList);
  }, [originalList]);

  useEffect(() => {
    var list = originalList.filter((item) => item.label == activeFilter)[0]
      .formacoes;
    if (search && search !== "") {
      list = list.filter((item) =>
        item.nomeformacao.toLowerCase().includes(search.toLowerCase())
      );
      if (values.length > 0) {
        for (let i = 0; i < values[1].length; i++) {
          list = list.filter((item) => item.username == values[1][i].label);
        }
      }
    } else {
      if (values.length > 0) {
        for (let i = 0; i < values[1].length; i++) {
          list = list.filter((item) => item.username == values[1][i].label);
        }
      }
    }

    var tempData = [...list];
    tempData = sortByDate(tempData);
    setFilteredList(tempData);
  }, [search, values, activeFilter, originalList, dateSortIncreasing]);

  const filterColab = (inputValue) => {
    return colabList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const sortByDate = (data) => {
    if (dateSortIncreasing) {
      return data.sort(
        (objA, objB) =>
          Date.parse(objA.dataFormacao) - Date.parse(objB.dataFormacao)
      );
    } else {
      return data.sort(
        (objA, objB) =>
          Date.parse(objB.dataFormacao) - Date.parse(objA.dataFormacao)
      );
    }
  };

  const handleDateChanged = (increasing) => {
    setDateSort(increasing);
  };

  const handleType = (index, event) => {
    setSearch(event.target.value);
  };

  const handleDropdown = (index, opt) => {
    let data = [...values];
    data[index] = opt;
    setValues(data);
  };

  const handleSelectedTab = (label) => {
    setActiveFilter(label);
    //var list = originalList.filter((item) => item.label == label);
    //setFilteredList(list[0].formacoes);
  };

  if (activeFilter == null) handleSelectedTab("Formações pendentes"); // Default tab

  return (
    <Tabs
      value="pendentes"
      className="flex flex-col tabsHeader scrollbar-hide pr-5"
    >
      {/* First value */}
      <TabsHeader className="mt-0">
        <div className="flex items-start gap-8 px-[0.625rem]">
          {originalList.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className={`w-fit pb-2 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary ${
                label == activeFilter && "text-primary border-primary"
              }`}
              onClick={() => handleSelectedTab(label)}
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
              list={colabList}
              multi={true}
              showTitle={false}
              error={"Por favor selecione ou adicione um nome"}
              value={values[1]}
              callback={handleDropdown}
              searchCall={filterColab}
            />
          </div>
          <div className="flex justify-center items-center">
            <DateOrder callback={handleDateChanged} />
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
            {activeFilter !== null &&
            Object.keys(filteredList).length > 0 &&
            filteredList !== null ? (
              filteredList.map((card, index) => {
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
                    sidebarName={sideBarName}
                    onAceitarclick={() => handleAceitarFormacaoPendente(card)}
                  />
                );
              })
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </TabsBody>
    </Tabs>
  );
}
