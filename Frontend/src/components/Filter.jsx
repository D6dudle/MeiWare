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
        <div className='gap-8 px-[0.625rem] top-[5.625rem] left-8 items-start'>
            <div className='gap-2 px-[0.625rem] top-[5.625rem] left-8 items-start'>
                <button onClick={() => setActiveFilter(1)}  className='w-fit pr-3 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    Formações pendentes</button>
                <button onClick={() => setActiveFilter(2)} className='w-fit pr-3 border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    Formações a decorrer</button>
                <button onClick={() => setActiveFilter(3)} className='w-fit  border-b-[0.063rem] border-gray4 text-gray4 font-IBM lowercase hover:border-primary hover:text-primary'>
                    Formações terminadas</button>
            </div>
        </div>
      )
}
export default Filter;