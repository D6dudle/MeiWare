import React from 'react'
import Grama from '../assets/Grama.svg';
import { useState } from 'react';
import data from '../constants/dataApagar';
import { FiSearch } from "react-icons/fi";
import Filter from '../components/Filter';
import Select from 'react-select';
import Formacao from '../components/Formacao';


import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";


export default function ListarFormacao () {

  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [query, setQuery] = useState(""); 

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

  
  console.log("Formation Camps: " + formationCamps);
  return (
    <div className="pl-8 pr-8 w-full h-full overflow-scroll scrollbar-hide">
      <h1 className="text-white font-bold text-3xl mt-8">
        Listar Formações
      </h1>

    <div className='mt-10 mb-[1.688rem]'>
      <Filter data={data} 
              setFiltered={setFiltered} 
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
      />
      </div>


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
              console.log(opt);
              setFormationCamps({ ...formationCamps, nomeColaborador: opt });
            }
            }
          />
          <p className='relative top-1 text-xs text-error'>{formErrors.nomeColaborador}</p>
        </div>
      </div>

      <div>
        <input 
          type="text"
          placeholder='Search...'
          className='search flex w-full h-8 mb-4 pl-2 inputText'
          onChange={(e) => setQuery(e.target.value)}
          />
      </div>

      <>
      <div className='flex mb-8 mt-20 font-bold text-2xl'>
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
 