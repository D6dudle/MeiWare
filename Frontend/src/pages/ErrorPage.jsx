import React from 'react'
import Grama from '../assets/Grama.svg';


export const ErrorPage = () => {
  return (
    <div className="h-screen bg-darkBlack flex flex-col justify-center items-center ">
        <img src={Grama} alt="Logo Grama" />
        <h1 className="text-white font-bold text-3xl mt-8">Ups! Esta página não existe...</h1>
    </div>
  )
}
