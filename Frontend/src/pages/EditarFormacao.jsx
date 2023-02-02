import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
import PedidoFormacaoService from "../services/pedido-formacao.service";

export default function EditarFormacao() {
  const formationId = useLocation().search.slice(4); //ID da formação que vem da outra página
  const [datePick, setDatePick] = useState(false);
  const [files, setFiles] = useState([]);
  const [formationCamps, setFormationCamps] = useState([]);

  const navigate = useNavigate();

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
      descricao: "ALLEZ PORTO ALLEZ",
      formador: "Benfica ao Colo LDA",
      preco: 100.1,
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

  
  useEffect(() => {
    PedidoFormacaoService.getPedidoFormacaoById(formationId).then((data) => {
      data.dataFormacao = new Date(data.dataFormacao);
      setFormationCamps(data);
      setFiles(data.listAnexoRef)
    });
  }, []);

  const handleFiles = (files) => {
    console.log(files)
    setFiles(files)
  }

  //Aqui vai levar uma query para ir buscar os campos de informação à BD para preencher os campos

  var prevUrl = useLocation().state;
  if (prevUrl === null) {
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
      formationCamps.quemFezPedidoNome != null && formationCamps.quemFezPedidoNome.length == 0 && isSubmit === true
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
    if (!formValues.formador) {
      errors.formador = "Formador é obrigatório";
    }
    if (!formValues.justificacaoFormacao) {
      errors.justificacaoFormacao = "Justificação da formação é obrigatório";
    }
    if (formValues.quemFezPedidoNome.length == 0) {
      errors.quemFezPedidoNome = "Nome do colaborador é obrigatório";
    }
    if (!formValues.dataFormacao) {
      errors.dataFormacao = "Data de formação é obrigatório";
    }
    if (!formValues.preco) {
      errors.preco = "Preço da formação é obrigatório";
    }
    if (!formValues.descricao) {
      errors.descricao = "Descrição da formação é obrigatório";
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
    let errors = validate(formationCamps)
    setFormErrors(errors);
    setIsSubmit(true);

    if(Object.keys(errors).length === 0) {
      var removedAnexos = [];
      var addedAnexos = [];

      for(let i = 0; i < formationCamps.listAnexoRef.length; i++) {
        if(files.find(a => a.id == formationCamps.listAnexoRef[i].id) == undefined) {
          removedAnexos.push(formationCamps.listAnexoRef[i]);
        }
      }

      for(let i = 0; i < files.length; i++) {
        if(formationCamps.listAnexoRef.find(a => a.id == files[i].id) == undefined) {
          addedAnexos.push(files[i]);
        }
      }

      PedidoFormacaoService.updatePedidoFormacao(formationCamps, addedAnexos, removedAnexos);
      navigate(prevUrl);
    }
  };

  return (
    <div className="flex flex-col pl-8 pr-8 w-full h-full overflow-hidden">
      <div className="sticky top-0 mt-8">
        <div className="flex flex-row items-center gap-5">
          <GoBackButton url={prevUrl} />
          <h1 className="text-white font-bold text-3xl">Editar Formação</h1>
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
            Requisitante: 
            <span className="text-white font-light">
              {formationCamps.quemFezPedidoNome}
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
                    htmlFor="formador"
                    className="text-gray5 text-[14px]"
                  >
                    formador
                  </label>
                  <input
                    type="text"
                    className={`inputText ${
                      formationCamps.formador || isSubmit === false
                        ? null
                        : "border-error"
                    }`}
                    id="formador"
                    placeholder="formador"
                    onChange={(e) => {
                      setFormationCamps({
                        ...formationCamps,
                        formador: e.target.value,
                      });
                    }}
                    value={formationCamps.formador}
                  />
                  <p className="inputTextErrors">{formErrors.formador}</p>
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
                {/* NOME COLABORADOR 
                <div className="mb-4">
                  <label
                    htmlFor="quemFezPedidoNome"
                    className="text-gray5 text-[14px] "
                  >
                    nome colaborador
                  </label>
                  <div className="relative">
                    <Select
                      className={` ${
                        formationCamps.quemFezPedidoNome || isSubmit === false
                          ? null
                          : "border-error"
                      } mt-2 mb-8`}
                      styles={customStyles}
                      options={colaboradores}
                      defaultValue={formationCamps.quemFezPedidoNome}
                      isMulti
                      placeholder="nome"
                      value={formationCamps.quemFezPedidoNome}
                      onChange={(opt) => {
                        setFormationCamps({
                          ...formationCamps,
                          quemFezPedidoNome: opt,
                        });
                      }}
                    />
                    <p className="relative top-1 text-xs text-error">
                      {formErrors.quemFezPedidoNome}
                    </p>
                  </div>
                </div>*/}
                
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
                      value={formationCamps.dataFormacao != undefined && formationCamps.dataFormacao.toLocaleDateString()}
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
                        formationCamps.preco || isSubmit === false
                          ? null
                          : "border-error"
                      }`}
                      name="input-name"
                      placeholder="preço"
                      value={formationCamps.preco}
                      decimalsLimit={2}
                      decimalSeparator=","
                      groupSeparator="."
                      onValueChange={(value, name) =>
                        setFormationCamps({
                          ...formationCamps,
                          preco: value,
                        })
                      }
                    />
                    <div className="absolute right-5 top-3.5">
                      <BiEuro className="h-6 w-6" />
                    </div>
                    <p className="inputTextErrors">
                      {formErrors.preco}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-[332px]">
                {/* DESCRICAO DA FORMACAO */}
                <div className="mb-4">
                  <label
                    htmlFor="descricao"
                    className="text-gray5 text-[14px] "
                  >
                    descrição da formação
                  </label>
                  <textarea
                    className={`inputText min-h-[130px] ${
                      formationCamps.descricao || isSubmit === false
                        ? null
                        : "border-error"
                    }`}
                    id="descricao"
                    placeholder="descrição da formação"
                    onChange={(e) => {
                      setFormationCamps({
                        ...formationCamps,
                        descricao: e.target.value,
                      });
                    }}
                    value={formationCamps.descricao}
                  />
                  <p className="inputTextErrors">
                    {formErrors.descricao}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-6xl w-full items-center">
              <DropzoneFiles callback={handleFiles} anexos={formationCamps.listAnexoRef} />
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
