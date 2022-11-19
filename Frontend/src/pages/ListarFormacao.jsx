import React from 'react'
import Grama from '../assets/Grama.svg';
import { useState } from 'react';
import data from '../constants/dataApagar';
import { FiSearch } from "react-icons/fi";
import Formation from '../components/Formation';
import Filter from '../components/Filter';
import Select from 'react-select';



import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";


export default function ListarFormacao () {

  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
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

  
  return (
    <div className="ml-8">
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
              //console.log(opt);
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
    {notifications.length > 0 &&
        <p>
          You have {notifications.length} notifications.
        </p>
      }
    </>

      <div className='formacoes flex flex-col items-start p-0 gap-8'>
        {filtered.filter(item=>item.courseName.toLowerCase().includes(query)
        ).map((item, index) => {
          return <Formation key={item.id} formation={item}/>;
        })}

      </div>

    </div>


  )
}
 