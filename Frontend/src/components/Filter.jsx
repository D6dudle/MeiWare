import React from 'react'
import {useEffect} from 'react'
import { FiAlertCircle, FiZap, FiCheck } from "react-icons/fi";


function Filter({setActiveFilter, activeFilter, setFiltered, data}){

    useEffect(() => {
        if(activeFilter == 0){
            setFiltered(data);
            return;
        }
        const filtered = data.filter((item) => item.type === activeFilter);
        setFiltered(filtered);
    }, [activeFilter])
    return (
        <div className='flex'>
                <button onClick={() => setActiveFilter(1)}  className='w-fit ml-2 pr-3 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiAlertCircle className="flex w-4 h-4 mr-2"/>
                    
                    Formações pendentes</button>
                <button onClick={() => setActiveFilter(2)} className='w-fit ml-8 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiZap className="flex w-4 h-4 mr-2"/>
                    Formações a decorrer</button>
                <button onClick={() => setActiveFilter(3)} className='w-fit ml-8 mr-2 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    <FiCheck className="flex w-4 h-4 mr-2"/>
                    Formações terminadas</button>
        </div>
      )
}
export default Filter;