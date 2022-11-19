import React from 'react'
import {useEffect} from 'react'
import { FiAlertCircle, FiZap, FiCheck } from "react-icons/fi";


function Filter({setActiveFilter, activeFilter, setFiltered, data}){

    useEffect(() => {
        if(activeFilter == "ALL"){
            setFiltered(data);
            return;
        }
        const filtered = data.filter((item) => item.type === activeFilter);
        setFiltered(filtered);
    }, [activeFilter])
    return (
        <div className='flex'>
                <button onClick={() => setActiveFilter("PENDENTE")}  className='w-fit ml-2 pr-3 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiAlertCircle className="flex w-4 h-4 mr-2"/>
                    
                    Formações pendentes</button>
                <button onClick={() => setActiveFilter("CURSO")} className='w-fit ml-8 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiZap className="flex w-4 h-4 mr-2"/>
                    Formações a decorrer</button>
                <button onClick={() => setActiveFilter("TERMINADA")} className='w-fit ml-8 mr-2 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiCheck className="order-none"/>
                    <p className='order-1'>Formações terminadas</p>
                    </button>
        </div>
      )
}
export default Filter;