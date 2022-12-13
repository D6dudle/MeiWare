import React from "react";
import { useState } from "react";
import { Search } from "react-feather";
import Select from "react-select";
import { Calendar } from "react-date-range";
import { Image, Edit } from "react-feather";
import { Button } from "../components/Button";
import { Formacao } from "../components/Formacao";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";
import DateOrder from "../components/DateOrder";
import { dataCard } from "../constants/menuConstants";
import { useEffect } from "react";

export const PesquisarFormacao = ({}) => {
  const [formationCamps, setFormationCamps] = useState({
    nomeColaborador: [],
    data: new Date(),
  });

  const [dataCardList, setDataCardList] = useState(dataCard);
  const [isRejeitadas, setAprovadas] = useState(false); // Is Aprovadas open?
  const [query, setQuery] = useState("");

  const corFormacao = [
    { tipo: "TERMINADA", cor: "primary" },
    { tipo: "REJEITADA", cor: "error" },
    { tipo: "CURSO", cor: "success" },
    { tipo: "PENDENTE", cor: "white" },
  ];

  const colaboradorStyles = {
    option: (provided) => ({
      ...provided,
      color: "#F2F2F2",
      background: "#282828",
      primary25: "#E0E0E0",
    }),
    control: (base, state) => ({
      ...base,
      background: "#282828",
      color: "#F2F2F2",
      backgroundColor: state.isFocused ? "#ECC039" : "3e3e3e",

      // Removes weird border around container
      boxShadow: state.isFocused ? "#ECC039" : "#ECC039",
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#ECC039" : "#ECC039",
      },
    }),

    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  const colaboradores = [
    { label: "Bruno", value: "Bruno" },
    { label: "Diogo", value: "Diogo" },
    { label: "Henrique", value: "Henrique" },
    { label: "José", value: "José" },
    { label: "Nuno", value: "Nuno" },
    { label: "Pedro", value: "Pedro" },
  ];

  const handleCancelarFormacao = (card) => {
    setDataCardList(
      dataCardList.filter((data) => data.idCurso !== card.idCurso)
    );
  };

  useEffect(() => {
    console.log("Alteração na lista:");
    console.log(dataCardList);
  }, [dataCardList]);

  return (
    <div className="pl-8 pr-8 w-full h-full overflow-scroll scrollbar-hide">
      <h1 className="text-white font-bold text-3xl mt-8 mb-8">
        Pesquisar formação
      </h1>

      <div className="mt-8  justify-evenly w-full">
        <div className="flex flex-wrap justify-between sm:justify-start">
          <div className="mr-20 w-8/12">
            {/* PESQUISA... */}
            <div className="relative">
              <div className="absolute left-2 top-5">
                <Search className="h-4" />
              </div>

              <input
                type="text"
                placeholder="pesquisa..."
                className="inputText search pl-[35px]"
                id="nomeSearchFormacao"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* COLABORADOR */}
            <div className="mb-4">
              <div className="relative">
                <div className="absolute left-5 top-4">
                  <Search className="h-5" />
                </div>

                <Select
                  //className={` ${formationCamps.nomeColaborador || isSubmit === false ? null : 'border-error'}`}
                  styles={colaboradorStyles}
                  options={colaboradores}
                  isMulti
                  placeholder="colaborador..."
                  value={formationCamps.nomeColaborador}
                  onChange={(opt) => {
                    console.log(opt);
                    setFormationCamps({
                      ...formationCamps,
                      nomeColaborador: opt,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              <button
                className="btnSearchFunc"
                onClick={() => {
                  /* Logica ordenar lista */
                  setAprovadas(!isRejeitadas);
                }}
              >
                {isRejeitadas ? (
                  <>
                    <p className="btnIcons leading-[120%]">Rejeitadas</p>
                    <ChevronDown className="w-4 h-4 btnIcons" />
                  </>
                ) : (
                  <>
                    <p className="btnIcons leading-[120%]">Aprovadas</p>
                    <ChevronUp className="w-4 h-4 btnIcons" />
                  </>
                )}
              </button>

              <DateOrder />
            </div>
          </div>
          <div className="flex mb-4 mr-auto">
            <Calendar
              color=""
              onChange={(item) => {
                setFormationCamps({ ...formationCamps, data: item });
              }}
              date={formationCamps.data}
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        {dataCardList
          .filter(
            (item) =>
              item.nomeformacao.toLowerCase().includes(query) &&
              containsList(formationCamps.nomeColaborador, item.username)
          )
          .map((card, index) => (
            <Formacao
              key={index}
              username={card.username}
              nomeformacao={card.nomeformacao}
              dataFormacao={card.dataFormacao}
              justificacaoFormacao={card.justificacaoFormacao}
              idCurso={card.idCurso}
              tipoFormacao={card.tipoFormacao}
              consultar={card.consultar}
              urlBack={"/home/formacao/pesquisar-formacao"}
              onItemDelete={() => handleCancelarFormacao(card)}
            />
          ))}
      </div>
    </div>
  );

  function containsList(listToSearch, item) {
    if (listToSearch.length === 0) return true;
    return listToSearch.find((i) => i.label === item);
  }
};

export default PesquisarFormacao;
