import React from 'react'

function Formation({formation}) {
    return(
            //Formation Card
            <div className='border border-indigo-50 flex-none order-1 flex-grow-0 w-[69.5rem] h-[9.313rem]'>
                
                <div className='flex-row justify-between'>
                    {/*User photo*/}
                    <div className='flex flex-row items-center p-0 gap-2 text-[0.875rem]'>
                        <img src='' className='flex-none order-0 flex-grow-0 rounded'></img>
                        <p>{formation.user}</p>
                        <p className='text-gray4 font-semibold'>Started a</p>
                        <p className='font-semibold'>new course</p>
                    </div>

                    {/*Buttons*/}
                    <div className='flex flex-row items-start p-0 gap-4'>
                        <button className='flex flex-row justify-center items-center p-4 gap-2 rounded-sm flex-none order-0 flex-grow-0'>
                            Editar Informação</button>
                        <button className='flex flex-row justify-center items-center p-4 gap-2 rounded-sm flex-none order-1 flex-grow-0 bg-error text-black font-bold'>
                            Cancel</button>
                    </div>
                </div>

                {/*Course Name Group*/}
                <div className='flex flex-row items-start gap-[0.625rem] top-[3.813rem] left-4'>
                    <p className='text-[0.875rem] text-gray4 items-center order-0 flex-none font-semibold'>Course Name:</p>
                    <p className='text-[0.875rem] font-bold'>{formation.courseName}</p>
                </div>

                {/*Request on / Additional Information / Course ID / Group*/}
                <div className='flex flex-row items-start p-0 gap-10'>
                    <div className='flex-none order-0 flex-grow-0 w-[9.625rem] h-[2.313rem] leading-normal'>
                        <p className='text-[0.75rem] font-medium not-italic text-gray4'>Requested on:</p>
                        <p className='text-[1rem] font-normal leading-1.2'>{formation.date}</p>
                    </div>
                    <div className='flex-none order-1 flex-grow-0 leading-normal'>
                        <p className='text-[0.75rem] font-medium not-italic text-gray4'>Additional info by the user:</p>
                        <p className='text-[1rem]'>{formation.text}</p>
                    </div>
                    <div className='flex-none order-2 flex-grow-0'>
                        <p className='text-[0.75rem] font-medium not-italic text-gray4'>Course id:</p>
                        <p className='text-base not-italic font-normal'>{formation.id}</p>
                    </div>
                </div>

                
            </div>
            
            
       
    )
        

}

export default Formation;