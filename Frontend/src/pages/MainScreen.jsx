import React from 'react'
import { Breadcrum } from '../components/Breadcrum'
import Sidebar from '../components/Sidebar'
import { Routes, Route } from "react-router-dom";
import Formacao from './Formacao';
import AdicionarFormacao from './AdicionarFormacao';
import ListarFormacao from './ListarFormacao';
import { ErrorPage }  from './ErrorPage'
import Grama from '../assets/Grama.svg';
import AdicionarPublicacao from './AdicionarPublicacao';



function MenuInicial(){
  return (
    <div className="flex flex-col justify-start items-center pt-24">
        <img src={Grama} alt="Logo Grama" />
        <h1 className="text-white font-bold text-3xl mt-16">Bem vindo ao teu portal de formações 😄 Utilizador!!</h1>
    </div>
  )
}

export default function MainScreen() {
  return (
    <div className="relative flex bg-darkBlack" style={{height:'100vh'}}>
      <Sidebar />
      <div className="flex-1 flex flex-col pt-4 pl-8 pr-8 bg-dar">
        <Breadcrum />
        <div className="bg-black2 h-[calc(100vh-4.5rem)] pb-8 rounded-sm text-white overflow-scroll scrollbar-hide">
          <Routes>
            {/* Definir todas as routes existentes */}
            <Route path="/" element={<MenuInicial />} />
            <Route path="/formacao" element={<Formacao />}/>
            <Route path="/formacao/adicionar-formacao" element={<AdicionarFormacao />} />
            <Route path="/formacao/listar-formacao" element={<ListarFormacao />} />
            <Route path="/forum/adicionar-publicacao" element={<AdicionarPublicacao />} />
            <Route path="*" element= {<ErrorPage/>}/>            
          </Routes>
        </div>
      </div>

    </div>
  )
}
