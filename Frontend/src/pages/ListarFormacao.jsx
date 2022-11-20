import React from 'react'
import Grama from '../assets/Grama.svg';
import { useState } from 'react';
import data from '../constants/dataApagar';
import { FiSearch } from "react-icons/fi";
import Filter from '../components/Filter';
import Select from 'react-select';
import Formacao from '../components/Formacao';
import DropdownFilter from '../components/DropdownFilter';
import { ChevronDown, ChevronUp} from "react-feather";


export default function ListarFormacao () {

  const [filtered, setFiltered] = useState([]); //Filtered -> lista de objetos consoante o filtro clicado (Formações Pendentes, a decorrer, terminadas) -> é utilizado no Filter.jsx
  const [activeFilter, setActiveFilter] = useState("ALL"); //Saber que filtro é que está ativo (Pendente, a decorrer, terminado), por default está ALL para mostrar todas as formações 
  const [query, setQuery] = useState(""); //Para armazenar o conteudo da search bar
  const [open, setOpen] = useState(false); // Is Por aprovar list open?
  const [dateActiveFilter, setDateActiveFilter] = useState("NA"); // Is Por aprovar list open?
  const [formationCamps, setFormationCamps] = useState({
    nomeColaborador: []
  });


  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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

  const dateOptions = [
    {value: "des", label: "Data Decrescente"},
    {value: "asc", label: "Data Crescente"}
  ];


  const handlePorAprovarFilter = (e) => {
    if (open) {
      setOpen(!open);
    }
    else{
      setOpen(!open);
    }
    e.preventDefault();
    alert("Click em Por aprovar");
  };


  return (
    <div className="pl-8 pr-8 w-full h-full overflow-scroll scrollbar-hide">
      <h1 className="text-white font-bold text-3xl mt-8">
        Listar Formações
      </h1>

    {/*3 filtro iniciais -> (Pendente, a decorrer, terminado) */}
    <div className='mt-10 mb-[1.688rem]'>
      <Filter data={data} 
              setFiltered={setFiltered} 
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
      />
      </div>

      {/*Filtro utilizadores */}
      <div className="mb-4">
        <div className='relative'>
          <Select
            className={` ${formationCamps.nomeColaborador || isSubmit === false ? null : 'border-error'}`}
            styles={customStyles}
            options={aquaticCreatures}
            isMulti
            placeholder='nome'
            value={formationCamps.nomeColaborador}
            onChange={opt => {
              setFormationCamps({ ...formationCamps, nomeColaborador: opt });
            }
            }
          />
          <p className='relative top-1 text-xs text-error'>{formErrors.nomeColaborador}</p>
        </div>
      </div>
          
      {/*Search Bar*/}
      <div>
        <input 
          type="text"
          placeholder='Search...'
          className='search flex w-full h-8 mb-4 pl-2 inputText'
          onChange={(e) => setQuery(e.target.value)}
          />
      </div>
      
      {/*Butões Filtros Data e Aprovar*/}
      <div className='flex'>
        <div className="flex w-4/12 h-8 mt-4 font-semibold flex-row items-end">
          <DropdownFilter 
          placeHolder="Data"
          options={dateOptions}
          setFilter={setDateActiveFilter}
          />
        </div>
        

        
        <button
        className='flex ml-8 mt-4 h-8 flex-row items-end mb-8'
          onClick={handlePorAprovarFilter}
          >
          <p className="btnIcons leading-[120%]">Por aprovar</p>
          {open ? (
            <ChevronDown className="w-4 h-4 btnIcons" />
          ) : (
            <ChevronUp className="w-4 h-4 btnIcons" />
          )}
        </button>
    </div>
      
      {/*Mostra os titulos de acordo com o filtro clicado*/}
      <>
      <div className='flex mb-8 mt-8 font-bold text-2xl'>
        {activeFilter == "CURSO" ? (
          <h1> Formações a Decorrer</h1>
        ): null}
        {activeFilter == "TERMINADA" ? (
          <h1> Formações Terminadas</h1>
        ): null}
        {activeFilter == "PENDENTE" ? (
          <h1> Formações Pendentes</h1>
        ): null}
      </div>
      </>
      
      {/*Mostrar a lista das formações, À variavel filtered aplica um filter com o que recebe da search bar*/}
      {filtered.filter(item=>item.courseName.toLowerCase().includes(query)
      ).map((item, index) => {
        return <Formacao
        key={index}
        username={item.user}
        nomeformacao={item.courseName}
        dataFormacao={item.date}
        justificacaoFormacao={item.text}
        idCurso={item.id}
        tipoFormacao={item.type}
      />;
      })}

    </div>


  )
}
 