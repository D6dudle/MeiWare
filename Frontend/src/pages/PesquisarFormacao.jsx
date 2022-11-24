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

export const PesquisarFormacao = ({}) => {
  const [formationCamps, setFormationCamps] = useState({
    nomeColaborador: [],
    data: new Date(),
  });

  const [isRejeitadas, setAprovadas] = useState(false); // Is Aprovadas open?
  const [query, setQuery] = useState("");

  const corFormacao = [
    { tipo: "TERMINADA", cor: "primary" },
    { tipo: "REJEITADA", cor: "error" },
    { tipo: "CURSO", cor: "success" },
    { tipo: "PENDENTE", cor: "white" },
  ];

  const dataCard = [
    {
      username: "Pedro",
      nomeformacao: "Introdução a Angular",
      dataFormacao: "16/11/2022 14:00",
      justificacaoFormacao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      idCurso: "P-T-331",
      tipoFormacao: "TERMINADA",
      consultar: true,
    },
    {
      username: "Henrique",
      nomeformacao: "Introdução a Java",
      dataFormacao: "18/11/2022 14:00",
      justificacaoFormacao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      idCurso: "H-T-666",
      tipoFormacao: "CURSO",
    },
    {
      username: "José",
      nomeformacao: "Introdução a React",
      dataFormacao: "17/11/2022 14:00",
      justificacaoFormacao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      idCurso: "J-F-111",
      tipoFormacao: "PENDENTE",
    },
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
                  placeholder="colaborador"
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
        {dataCard
          ?.filter(
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
