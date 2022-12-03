import React from "react";
import { Breadcrum } from "../components/Breadcrum";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Formacao from "./Formacao";
import AdicionarFormacao from "./AdicionarFormacao";
import ListarFormacao from "./ListarFormacao";
import ControloBudget from "./ControloBudget";
import GerirPedidos from "./GerirPedidos";
import Colaboradores from "./Colaboradores";
import PesquisarFormacao from "./PesquisarFormacao";
import PesquisarDetalhes from "./PesquisarDetalhes";
import { ErrorPage } from "./ErrorPage";
import Grama from "../assets/Grama.svg";
import AdicionarPublicacao from "./AdicionarPublicacao";
import AdicionarColaborador from "./AdicionarColaborador";
import AprovarPublicacao from "./AprovarPublicacao";
import Exemplo from "./Exemplo";
import PesquisarForum from "./PesquisarForum";
import ListarPedidos from "./ListarPedidos";
import PesquisarForumConsulta from "./PesquisarForumConsulta";
import { useState, useRef } from "react";

function MenuInicial() {
  return (
    <div className="flex flex-col justify-start items-center pt-24">
      <img src={Grama} alt="Logo Grama" />
      <h1 className="text-white font-bold text-3xl mt-16">
        Bem vindo ao teu portal de formações 😄 Utilizador!!
      </h1>
    </div>
  );
}

export default function MainScreen() {
  const sidebar = useRef(null);

  const handleChange = (tab, old) => {
    sidebar.current(tab, old);
  };

  return (
    <div className="relative flex bg-darkBlack" style={{ height: "100vh" }}>
      <Sidebar trigger={sidebar} />
      <div className="flex-1 flex flex-col pt-4 pl-8 pr-8 bg-dar">
        <Breadcrum callback={handleChange} />
        <div className="bg-black2 h-[calc(100vh-4.5rem)] rounded-sm text-white">
          <Routes>
            {/* DEV */}
            <Route path="/exemplo" element={<Exemplo />} />
            {/* Definir todas as routes existentes */}
            <Route path="/" element={<MenuInicial />} />
            <Route path="/formacao" element={<Formacao />} />
            <Route
              path="/formacao/adicionar-formacao"
              element={<AdicionarFormacao />}
            />
            <Route
              path="/formacao/pesquisar-formacao"
              element={<PesquisarFormacao />}
            />
            <Route
              path="/formacao/listar-formacao"
              element={<ListarFormacao />}
            />
            <Route
              path="/formacao/pesquisar-formacao"
              element={<PesquisarFormacao />}
            />
            <Route
              path="/formacao/pesquisar-detalhes"
              element={<PesquisarDetalhes />}
            />
            <Route
              path="/knowledge/adicionar-publicacao"
              element={<AdicionarPublicacao />}
            />
            <Route
              path="/knowledge/aprovar-publicacao"
              element={<AprovarPublicacao />}
            />
            <Route path="/knowledge/pesquisar" element={<PesquisarForum />} />
            <Route
              path="/knowledge/ver-publicacao-completa"
              element={<PesquisarForumConsulta />}
            />
            <Route path="/controlo" element={<ControloBudget />} />
            <Route path="/controlo/gerir-pedidos" element={<GerirPedidos />} />
            <Route path="/controlo/colaboradores" element={<Colaboradores />} />
            <Route
              path="/controlo/colaboradores/adicionar-colaborador"
              element={<AdicionarColaborador />}
            />
            <Route
              path="/controlo/listar-pedidos"
              element={<ListarPedidos />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
