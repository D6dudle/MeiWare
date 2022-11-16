import React from 'react'
import Grama from '../assets/Grama.svg';
import { useState } from 'react';
import data from '../constants/dataApagar';
import { FiSearch } from "react-icons/fi";
import Formation from '../components/Formation';
import Filter from '../components/Filter';

import { FiAlertCircle, FiZap, FiCheck } from "react-icons/fi";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

const data2 = [
  {
    label: "Formações pendentes",
    value: "pendentes",
    icon: <FiAlertCircle />,
  },
  {
    label: "Formações a decorrer",
    value: "decorrer",
    icon: <FiZap />,
  },

  {
    label: "Formações terminadas",
    value: "terminadas",
    icon: <FiCheck />,
  },
];



export default function ListarFormacao () {

  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className="ml-8 ">
      <h1 className="text-white font-bold text-3xl mt-8">
        Listar Formações
      </h1>

      <Filter data={data} setFiltered={setFiltered} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      <div className='formacoes'>
        {filtered.map((item, index) => {
          return <Formation formation={item}/>;
        })}

      </div>

    </div>


  )
}
 