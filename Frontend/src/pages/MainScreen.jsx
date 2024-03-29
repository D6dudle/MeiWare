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
import PesquisarForumConsulta from "./PesquisarForumConsulta";
import EditarColaborador from "./EditarColaborador";
import EditarFormacao from "./EditarFormacao";
import { useState, useRef, useEffect } from "react";
import Modal from "../components/Modal";
import PrivateRoutes from "../components/PrivateRoutes";
import UserService from "../services/user.service";

function MenuInicial() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userTemp = UserService.getCurrentUser();
    setUser(userTemp);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center pt-24">
      <img src={Grama} alt="Logo Grama" />
      <h1 className="text-white font-bold text-3xl mt-16">
        Bem-vindo(a) ao teu portal de formações {user.nome} 😄!!
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
            <Route path="/modal" element={<Modal />} />

            {/* Definir todas as routes existentes */}
            {/*
            <Route path="/formacao/pesquisar-formacao" element={<PrivateRoutes.GestorRoute/>}>
              <Route path="" element={<PesquisarFormacao />}/>
            </Route> */}

            <Route path="/" element={<MenuInicial />} />
            <Route path="/formacao" element={<Formacao />} />
            <Route
              path="/formacao/adicionar-formacao"
              element={<AdicionarFormacao />}
            />

            <Route
              path="/formacao/minhas-formacoes"
              element={<ListarFormacao />}
            />
            <Route
              path="/formacao/minhas-formacoes/editar-formacao"
              element={<EditarFormacao />}
            />
            <Route
              path="/formacao/minhas-formacoes/detalhes"
              element={<PesquisarDetalhes />}
            />
            <Route
              path="/knowledge/adicionar-publicacao"
              element={<AdicionarPublicacao updateSidebar={handleChange} />}
            />
            <Route
              path="/knowledge/aprovar-publicacao"
              element={<PrivateRoutes.GestorRoute />}
            >
              <Route path="" element={<AprovarPublicacao />} />
            </Route>
            <Route path="/knowledge" element={<PesquisarForum />} />
            <Route
              path="/knowledge/ver-publicacao-completa"
              element={<PesquisarForumConsulta />}
            />

            <Route path="/controlo" element={<PrivateRoutes.GestorRoute />}>
              <Route path="" element={<ControloBudget />} />
              <Route
                path="/controlo/gerir-formacoes"
                element={<GerirPedidos />}
              />
              <Route
                path="/controlo/gerir-formacoes/detalhes"
                element={<PesquisarDetalhes />}
              />
              <Route
                path="/controlo/gerir-formacoes/editar-formacao"
                element={<EditarFormacao />}
              />
              <Route
                path="/controlo/colaboradores"
                element={<Colaboradores />}
              />
              <Route
                path="/controlo/colaboradores/adicionar-colaborador"
                element={<AdicionarColaborador />}
              />
              <Route
                path="/controlo/colaboradores/editar-colaborador/"
                element={<EditarColaborador />}
              />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
