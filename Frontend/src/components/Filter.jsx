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
        <div className='flex '>
                <button onClick={() => setActiveFilter("PENDENTE")}  className='flex mr-8 w-fit border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiAlertCircle className="order-none mr-2 pb-0"/>
                    <p className='order-1'>Formações pendentes</p>
                    </button>
                <button onClick={() => setActiveFilter("CURSO")} className='flex mr-8 w-fit border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiZap className="order-none mr-2 pb-0"/>
                    <p className='order-1'>Formações a decorrer</p>
                    </button>
                <button onClick={() => setActiveFilter("TERMINADA")} className='flex w-fit border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiCheck className="order-none mr-2"/>
                    <p className='order-1'>Formações terminadas</p>
                    </button>
        </div>
      )
}
export default Filter;