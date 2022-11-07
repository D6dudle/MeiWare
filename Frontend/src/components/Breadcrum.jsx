import React from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { NavLink } from 'react-router-dom'
import { ChevronRight } from 'react-feather'



export const Breadcrum = () => {
  const breadcrumbs = useBreadcrumbs();
  console.log(breadcrumbs);  
  return (
    <div className="flex flex-row justify-start items-center  h-[40px] mb-4 rounded-sm text-gray3 ">
      {breadcrumbs.slice(1).map(({ match, breadcrumb }, index, row) => (
        <NavLink key={match.pathname} to={match.pathname} className={`flex mr-2 ${index + 1 === row.length ? 'text-white': ''}`}>
          {breadcrumb}

          {index + 1 !== row.length ? <ChevronRight className='text-white ml-2'/> : ''}
          
        </NavLink>
      )
      )}
      
    </div>
  )
}
