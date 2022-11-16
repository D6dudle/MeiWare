import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiEuro } from 'react-icons/bi';
import CurrencyInput from 'react-currency-input-field';
import Select from 'react-select';
import DropzoneFiles from "../components/Dropzone";

import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './calendar.css';

export default function AdicionarFormacao() {
  const navigate = useNavigate();
  const [datePick, setDatePick] = useState(false);

  const [formationCamps, setFormationCamps] = useState({
    nomeFormacao: "",
    fornecedor: "",
    justificacaoFormacao: "",
    nomeColaborador: [],
    dataFormacao: new Date(),
    precoFormacao: "",
    descricaoFormacao: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formationCamps));
    setIsSubmit(true);
    console.log("Button Submeter pressed!");

  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //sucess
      console.log(formationCamps)
      navigate('/home/formacao');

    }
  }, [formErrors]);


  const validate = (formValues) => {
    const errors = {};

    if (!formValues.nomeFormacao) {
      errors.nomeFormacao = 'Nome da formação é obrigatório'
    }
    if (!formValues.fornecedor) {
      errors.fornecedor = 'Fornecedor é obrigatório'
    }
    if (!formValues.justificacaoFormacao) {
      errors.justificacaoFormacao = 'Justificação da formação é obrigatório'
    }
    if (formValues.nomeColaborador.length == 0) {
      errors.nomeColaborador = 'Nome do colaborador é obrigatório'
    }
    if (!formValues.dataFormacao) {
      errors.dataFormacao = 'Data de formação é obrigatório'
    }
    if (!formValues.precoFormacao) {
      errors.precoFormacao = 'Preço da formação é obrigatório'
    }
    if (!formValues.descricaoFormacao) {
      errors.descricaoFormacao = 'Descrição da formação é obrigatório'
    }
    return errors;
  }

  const showCalendar = () => {
    setDatePick(!datePick);
  }

  const aquaticCreatures = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ];

  const customStyles = {
    option: provided => ({
      ...provided,
      color: '#F2F2F2',
      background: '#282828',
      primary25: '#E0E0E0',

    }),
    control: (base, state) => ({
      ...base,
      background: "#282828",
      color: "#F2F2F2",
      backgroundColor: state.isFocused ? "#ECC039" : "3e3e3e",

      // Overwrittes the different states of border

      borderColor: formationCamps.nomeColaborador.length == 0 && isSubmit === true ? '#FF9090' : '#6D6D6D',


      // Removes weird border around container
      boxShadow: state.isFocused ? '#ECC039' : '#ECC039',
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? '#ECC039' : '#ECC039',
      }
    }),


    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };

  const [file, setFile] = useState()
  function handleChange(event) {
    setFile(event.target.files[0])
  }

  return (
    <div className="ml-8 mr-8">
      <h1 className="text-white font-bold text-3xl mt-8">
        Adicionar formação
      </h1>

      <div className="mt-16 flex justify-evenly items-center">
        <form onSubmit={handleFormSubmit} className="" noValidate>
          <div className='flex flex-wrap justify-between sm:justify-start'>

            <div className="mr-20 w-[332px]">
              {/* NOME */}
              <div className="mb-4">
                <label htmlFor='nomeFormacao' className='text-gray5 text-[14px] '>nome</label>

                <input
                  type='text'
                  className={`inputText ${formationCamps.nomeFormacao || isSubmit === false ? null : 'border-error'}`}
                  id='nomeFormacao'
                  placeholder='nome'
                  onChange={(e) => { setFormationCamps({ ...formationCamps, nomeFormacao: e.target.value }) }}
                  value={formationCamps.nomeFormacao}
                />

                <p className='inputTextErrors'>{formErrors.nomeFormacao}</p>
              </div>

              {/* FORNECEDOR */}
              <div className='mb-4'>
                <label htmlFor='fornecedor' className='text-gray5 text-[14px]'>fornecedor</label>
                <input
                  type='text'
                  className={`inputText ${formationCamps.fornecedor || isSubmit === false ? null : 'border-error'}`}
                  id='fornecedor'
                  placeholder='fornecedor'
                  onChange={(e) => { setFormationCamps({ ...formationCamps, fornecedor: e.target.value }) }}
                  value={formationCamps.fornecedor}
                />
                <p className='inputTextErrors'>{formErrors.fornecedor}</p>
              </div>

              {/* JUSTIFICACAO DA FORMACAO */}
              <div className="mb-4">
                <label htmlFor='justificacaoFormacao' className='text-gray5 text-[14px] '>justificação da formação</label>
                <textarea
                  className={`inputText min-h-[130px] ${formationCamps.justificacaoFormacao || isSubmit === false ? null : 'border-error'}`}
                  id='justificacaoFormacao'
                  placeholder='justificação da formação'
                  onChange={(e) => { setFormationCamps({ ...formationCamps, justificacaoFormacao: e.target.value }) }}
                  value={formationCamps.justificacaoFormacao}
                />
                <p className='inputTextErrors'>{formErrors.justificacaoFormacao}</p>
              </div>
            </div>

            <div className="mr-20 w-[332px]">
              {/* NOME COLABORADOR*/}
              <div className="mb-4">
                <label htmlFor='nomeColaborador' className='text-gray5 text-[14px] '>nome colaborador</label>
                <div className='relative'>
                  <Select
                    className={` ${formationCamps.nomeColaborador || isSubmit === false ? null : 'border-error'}`}
                    styles={customStyles}
                    options={aquaticCreatures}
                    isMulti
                    placeholder='nome'
                    value={formationCamps.nomeColaborador}
                    onChange={opt => {
                      console.log(opt);
                      setFormationCamps({ ...formationCamps, nomeColaborador: opt });
                    }
                    }
                  />
                  <p className='relative top-1 text-xs text-error'>{formErrors.nomeColaborador}</p>
                </div>


              </div>

              {/* DATA */}
              <div className='mb-4'>
                <label htmlFor='data' className='text-gray5 text-[14px]'>data</label>
                <div className='relative '>

                  <input
                    readOnly={true}
                    type='text'
                    className={`inputText ${formationCamps.dataFormacao || isSubmit === false ? null : 'border-error'}`}
                    id='data'
                    placeholder='data'
                    onChange={(e) => { setFormationCamps({ ...formationCamps, dataFormacao: e.target.value }) }}
                    value={formationCamps.dataFormacao.toLocaleDateString()}
                    onClick={showCalendar}
                  />
                  <p className='inputTextErrors'>{formErrors.dataFormacao}</p>

                  {datePick && (
                    <Calendar
                      className='relative'
                      color=''
                      onChange={item => { setFormationCamps({ ...formationCamps, dataFormacao: item }) }}
                      date={formationCamps.dataFormacao} />
                  )}
                </div>
              </div>

              {/* PREÇO */}
              <div className='mb-4'>
                <label htmlFor='preco' className='text-gray5 text-[14px]'>preço</label>
                <div className='relative'>
                  <CurrencyInput
                    id='preco'
                    className={`inputText ${formationCamps.precoFormacao || isSubmit === false ? null : 'border-error'}`}
                    name="input-name"
                    placeholder="preço"
                    value={formationCamps.precoFormacao}
                    decimalsLimit={2}
                    decimalSeparator="," groupSeparator="."
                    onValueChange={(value, name) => setFormationCamps({ ...formationCamps, precoFormacao: value })}
                  />
                  <div className='absolute right-5 top-3.5'>
                    <BiEuro className="h-6 w-6" />
                  </div>
                  <p className='inputTextErrors'>{formErrors.precoFormacao}</p>
                </div>
              </div>
            </div>

            <div className="mr-20 w-[332px]">

              {/* DESCRICAO DA FORMACAO */}
              <div className="mb-4">
                <label htmlFor='descricaoFormacao' className='text-gray5 text-[14px] '>descrição da formação</label>
                <textarea
                  className={`inputText min-h-[130px] ${formationCamps.descricaoFormacao || isSubmit === false ? null : 'border-error'}`}
                  id='descricaoFormacao'
                  placeholder='descrição da formação'
                  onChange={(e) => { setFormationCamps({ ...formationCamps, descricaoFormacao: e.target.value }) }}
                  value={formationCamps.descricaoFormacao}
                />
                <p className='inputTextErrors'>{formErrors.descricaoFormacao}</p>
              </div>
            </div>
          </div>

          <DropzoneFiles />


          <div className='flex justify-center lg:justify-end items-center mt-6 mb-10'>
            <button className="flex items-center px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white" >
              Submeter
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
