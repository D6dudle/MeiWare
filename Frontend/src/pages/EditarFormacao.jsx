import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiEuro } from "react-icons/bi";
import CurrencyInput from "react-currency-input-field";
import Select from "react-select";
import DropzoneFiles from "../components/Dropzone";

import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./calendar.css";
import GoBackButton from "../components/GoBackButton";
import { useLocation } from "react-router-dom";

export default function EditarFormacao() {
  const formationId = useLocation().search.slice(4); //ID da formação que vem da outra página
  const [datePick, setDatePick] = useState(false);

  const [formationCamps, setFormationCamps] = useState({
    nomeFormacao: "",
    fornecedor: "",
    justificacaoFormacao: "",
    nomeColaborador: [],
    dataFormacao: new Date(),
    precoFormacao: "",
    descricaoFormacao: "",
    formationId: formationId,
  });
  const dataCard = [
    {
      username: "Pedro",
      nomeformacao: "Introdução a Angular",
      dataFormacao: new Date(),
      justificacaoFormacao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      idCurso: "P-T-331",
      tipoFormacao: "TERMINADA",
      consultar: true,
      descricaoFormacao: "ALLEZ PORTO ALLEZ",
      fornecedor: "Benfica ao Colo LDA",
      precoFormacao: 100.1,
    },
    {
      username: "Henrique",
      nomeformacao: "Introdução a Java",
      dataFormacao: new Date(),
      justificacaoFormacao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      idCurso: "H-T-666",
      tipoFormacao: "CURSO",
    },
    {
      username: "José",
      nomeformacao: "Introdução a React",
      dataFormacao: new Date(),
      justificacaoFormacao:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      idCurso: "J-F-111",
      tipoFormacao: "PENDENTE",
    },
  ];

  const colaboradores = [
    { label: "Bruno", value: "Bruno" },
    { label: "Diogo", value: "Diogo" },
    { label: "Henrique", value: "Henrique" },
    { label: "José", value: "José" },
    { label: "Nuno", value: "Nuno" },
    { label: "Pedro", value: "Pedro" },
  ];

  //SIMULAR O JSON DEVOLVIDO PELO BACKEND -> APAGAR
  //Este useEffect só corre uma vez quando se dá load à página
  useEffect(() => {
    for (var i = 0; i < dataCard.length; i++) {
      if (dataCard[i].idCurso == formationId) {
        for (var j = 0; j < colaboradores.length; j++) {
          if (colaboradores[j].value == dataCard[i].username) {
            setFormationCamps({
              ...formationCamps,
              nomeFormacao: dataCard[i].nomeformacao,
              justificacaoFormacao: dataCard[i].justificacaoFormacao,
              dataFormacao: dataCard[i].dataFormacao,
              descricaoFormacao: dataCard[i].descricaoFormacao,
              fornecedor: dataCard[i].fornecedor,
              precoFormacao: dataCard[i].precoFormacao,
              nomeColaborador: colaboradores[j],
            });
          } else {
            //Caso não tenha nenhum colaborador associado à formação - é só para não ter Null no dropwdown
            setFormationCamps({
              ...formationCamps,
              nomeFormacao: dataCard[i].nomeformacao,
              justificacaoFormacao: dataCard[i].justificacaoFormacao,
              dataFormacao: dataCard[i].dataFormacao,
              descricaoFormacao: dataCard[i].descricaoFormacao,
              fornecedor: dataCard[i].fornecedor,
              precoFormacao: dataCard[i].precoFormacao,
            });
          }
        }
      }
    }
  }, []);

  //Aqui vai levar uma query para ir buscar os campos de informação à BD para preencher os campos

  var prevUrl = useLocation().state;
  if (prevUrl === null) {
    console.log("NADA");
    prevUrl = "/home/formacao/pesquisar-formacao/";
  } else {
    prevUrl = prevUrl.prevUrl;
  }

  const customStyles = {
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

      // Overwrittes the different states of border

      borderColor:
        formationCamps.nomeColaborador.length == 0 && isSubmit === true
          ? "#FF9090"
          : "#6D6D6D",

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
  const validate = (formValues) => {
    const errors = {};

    if (!formValues.nomeFormacao) {
      errors.nomeFormacao = "Nome da formação é obrigatório";
    }
    if (!formValues.fornecedor) {
      errors.fornecedor = "Fornecedor é obrigatório";
    }
    if (!formValues.justificacaoFormacao) {
      errors.justificacaoFormacao = "Justificação da formação é obrigatório";
    }
    if (formValues.nomeColaborador.length == 0) {
      errors.nomeColaborador = "Nome do colaborador é obrigatório";
    }
    if (!formValues.dataFormacao) {
      errors.dataFormacao = "Data de formação é obrigatório";
    }
    if (!formValues.precoFormacao) {
      errors.precoFormacao = "Preço da formação é obrigatório";
    }
    if (!formValues.descricaoFormacao) {
      errors.descricaoFormacao = "Descrição da formação é obrigatório";
    }
    return errors;
  };

  const showCalendar = () => {
    setDatePick(!datePick);
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formationCamps));
    setIsSubmit(true);
    console.log("Button Submeter pressed!");
  };

  //console.log("ID DO SELECIONADO: " + formationId);

  return (
    <div className="flex flex-col pl-8 pr-8 w-full h-full overflow-hidden">
      <div className="sticky top-0 mt-8">
        <div className="flex flex-row items-center gap-5">
          <GoBackButton url={prevUrl} />
          <h1 className="text-white font-bold text-3xl">Editar Formacao</h1>
        </div>
      </div>
      <div className="sticky top-16 pb-8">
        <div className="mt-4">
          <p className="text-sm text-white font-semibold pt-3">
            ID da formação:
            <span className="text-white font-light"> {formationId}</span>
          </p>
        </div>
        <div className="mt-8">
          <p className="text-sm text-white font-semibold pt-3">
            Colaborador Requisitante:
            <span className="text-white font-light">
              {formationCamps.nomeColaborador.label}
            </span>
          </p>
        </div>
      </div>

      <div className="w-full h-full overflow-scroll scrollbar-hide">
          <form onSubmit={handleFormSubmit} className="" noValidate>
          <div className="flex flex-col justify-evenly w-full">
            <div className="max-w-6xl w-full flex flex-wrap justify-between">
              <div className="w-[332px]">
                {/* NOME */}
                <div className="mb-4">
                  <label
                    htmlFor="nomeFormacao"
                    className="text-gray5 text-[14px] "
                  >
                    nome
                  </label>

                  <input
                    type="text"
                    className={`inputText ${
                      formationCamps.nomeFormacao || isSubmit === false
                        ? null
                        : "border-error"
                    }`}
                    id="nomeFormacao"
                    placeholder="nome"
                    value={formationCamps.nomeFormacao}
                    onChange={(e) => {
                      setFormationCamps({
                        ...formationCamps,
                        nomeFormacao: e.target.value,
                      });
                    }}
                  />

                  <p className="inputTextErrors">{formErrors.nomeFormacao}</p>
                </div>

                {/* FORNECEDOR */}
                <div className="mb-4">
                  <label
                    htmlFor="fornecedor"
                    className="text-gray5 text-[14px]"
                  >
                    fornecedor
                  </label>
                  <input
                    type="text"
                    className={`inputText ${
                      formationCamps.fornecedor || isSubmit === false
                        ? null
                        : "border-error"
                    }`}
                    id="fornecedor"
                    placeholder="fornecedor"
                    onChange={(e) => {
                      setFormationCamps({
                        ...formationCamps,
                        fornecedor: e.target.value,
                      });
                    }}
                    value={formationCamps.fornecedor}
                  />
                  <p className="inputTextErrors">{formErrors.fornecedor}</p>
                </div>

                {/* JUSTIFICACAO DA FORMACAO */}
                <div className="mb-4">
                  <label
                    htmlFor="justificacaoFormacao"
                    className="text-gray5 text-[14px] "
                  >
                    justificação da formação
                  </label>
                  <textarea
                    className={`inputText min-h-[130px] ${
                      formationCamps.justificacaoFormacao || isSubmit === false
                        ? null
                        : "border-error"
                    }`}
                    id="justificacaoFormacao"
                    placeholder="justificação da formação"
                    onChange={(e) => {
                      setFormationCamps({
                        ...formationCamps,
                        justificacaoFormacao: e.target.value,
                      });
                    }}
                    value={formationCamps.justificacaoFormacao}
                  />
                  <p className="inputTextErrors">
                    {formErrors.justificacaoFormacao}
                  </p>
                </div>
              </div>

              <div className="w-[332px]">
                {/* NOME COLABORADOR*/}
                <div className="mb-4">
                  <label
                    htmlFor="nomeColaborador"
                    className="text-gray5 text-[14px] "
                  >
                    nome colaborador
                  </label>
                  <div className="relative">
                    <Select
                      className={` ${
                        formationCamps.nomeColaborador || isSubmit === false
                          ? null
                          : "border-error"
                      } mt-2 mb-8`}
                      styles={customStyles}
                      options={colaboradores}
                      defaultValue={formationCamps.nomeColaborador}
                      isMulti
                      placeholder="nome"
                      value={formationCamps.nomeColaborador}
                      onChange={(opt) => {
                        console.log("DROPDWON: " + opt);
                        setFormationCamps({
                          ...formationCamps,
                          nomeColaborador: opt,
                        });
                      }}
                    />
                    <p className="relative top-1 text-xs text-error">
                      {formErrors.nomeColaborador}
                    </p>
                  </div>
                </div>
                {/* DATA */}
                <div className="mb-4">
                  <label htmlFor="data" className="text-gray5 text-[14px]">
                    data
                  </label>
                  <div className="relative ">
                    <input
                      readOnly={true}
                      type="text"
                      className={`inputText ${
                        formationCamps.dataFormacao || isSubmit === false
                          ? null
                          : "border-error"
                      }`}
                      id="data"
                      placeholder="data"
                      onChange={(e) => {
                        setFormationCamps({
                          ...formationCamps,
                          dataFormacao: e.target.value,
                        });
                      }}
                      value={formationCamps.dataFormacao.toLocaleDateString()}
                      onClick={showCalendar}
                    />
                    <p className="inputTextErrors">{formErrors.dataFormacao}</p>

                    {datePick && (
                      <Calendar
                        className="relative"
                        color=""
                        onChange={(item) => {
                          setFormationCamps({
                            ...formationCamps,
                            dataFormacao: item,
                          });
                        }}
                        date={formationCamps.dataFormacao}
                      />
                    )}
                  </div>
                </div>

                {/* PREÇO */}
                <div className="mb-4">
                  <label htmlFor="preco" className="text-gray5 text-[14px]">
                    preço
                  </label>
                  <div className="relative">
                    <CurrencyInput
                      id="preco"
                      className={`inputText ${
                        formationCamps.precoFormacao || isSubmit === false
                          ? null
                          : "border-error"
                      }`}
                      name="input-name"
                      placeholder="preço"
                      value={formationCamps.precoFormacao}
                      decimalsLimit={2}
                      decimalSeparator=","
                      groupSeparator="."
                      onValueChange={(value, name) =>
                        setFormationCamps({
                          ...formationCamps,
                          precoFormacao: value,
                        })
                      }
                    />
                    <div className="absolute right-5 top-3.5">
                      <BiEuro className="h-6 w-6" />
                    </div>
                    <p className="inputTextErrors">
                      {formErrors.precoFormacao}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[332px]">
                {/* DESCRICAO DA FORMACAO */}
                <div className="mb-4">
                  <label
                    htmlFor="descricaoFormacao"
                    className="text-gray5 text-[14px] "
                  >
                    descrição da formação
                  </label>
                  <textarea
                    className={`inputText min-h-[130px] ${
                      formationCamps.descricaoFormacao || isSubmit === false
                        ? null
                        : "border-error"
                    }`}
                    id="descricaoFormacao"
                    placeholder="descrição da formação"
                    onChange={(e) => {
                      setFormationCamps({
                        ...formationCamps,
                        descricaoFormacao: e.target.value,
                      });
                    }}
                    value={formationCamps.descricaoFormacao}
                  />
                  <p className="inputTextErrors">
                    {formErrors.descricaoFormacao}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-6xl w-full items-center">
              <DropzoneFiles />
            </div>

            <div className="absolute right-20 bottom-10">
              <button className="sticky bottom-0 px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white">
                Submeter
              </button>
            </div>
            </div>
          </form>
      </div>
    </div>
  );
}
