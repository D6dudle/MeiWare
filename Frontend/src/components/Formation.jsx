import React from 'react'

function Formation({formation}) {
    return(
        <div className='flex flex-col items-start p-0 gap-8'>
            <div className='border border-indigo-50 flex-none order-1 flex-grow-0'>
                <div className='flex flex-row items-center gap-2'>
                    <img src='' className='flex-none order-0 flex-grow-0 rounded'></img>
                    <td>{formation.user}</td>
                    <td>Started a new course</td>
                </div>
                <div className='flex flex-row items-start gap-[0.625rem]'>
                    <td >Course Name:</td>
                    <td>{formation.courseName}</td>
                </div>
                <div className='flex flex-row items-start p-0 gap-10'>
                    <div className='flex-none order-0 flex-grow-0'>
                        <td >Requested on:</td>
                        <td>{formation.date}</td>
                    </div>
                    <div className='flex-none order-1 flex-grow-0'>
                        <td >Additional info by the user:</td>
                        <td>{formation.text}</td>
                    </div>
                    <div className='flex-none order-2 flex-grow-0'>
                        <td >Course id:</td>
                        <td>{formation.id}</td>
                    </div>
                </div>
            </div>
        </div>
            
       
    )
        

}

export default Formation;