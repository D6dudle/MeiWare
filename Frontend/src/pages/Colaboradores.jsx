import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";
import TrainingUserInfo from "../components/TrainingUserInfo";
import TextInput from "../components/TextInput";
import users from "../constants/usersAux"; // Remove later
import Modal from "../components/Modal";
import { getColumnsTable } from "../constants/tabelaUtilizadores";
import Table from "../components/TableComponent/Table";
import ColaboradoresService from "../services/get-colaboradores.service";
import UserService from "../services/user.service";
import UtilizadoresService from "../services/get-utilizadores.service";
import LogoGrama from "../assets/sidebar/logoGrama.png";
import TableV2 from "../components/TableV2/Table";
import Searchbar from "../components/TableV2/SearchBar";
import DropDown from "../components/TableV2/Dropdown";

export default function Colaboradores() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(true); // true = asc && false = desc
  const [usersList, setUsers] = useState(users);
  const [actualUser, setUser] = useState(usersList[0]);
  const [search, setSearch] = useState();
  const [modal, setModal] = useState({ show: false, data: null });
  const [filteredData, setFilteredData] = useState([]);

  const [dataColaborators, setDataColaborators] = useState([]);
  const columns = React.useMemo(() => getColumnsTable(), []);

  const handleCloseModal = () => {
    setModal({ show: false, data: null });
  };

  const confirmeActionModal = (u) => {
    setUsers(usersList.filter((user) => u.email !== user.email));
    setUser(users[0]);
    setModal({ show: false, data: null });
  };

  useEffect(() => {
    const user = UserService.getCurrentUser();
    if (user.isAdministrador) {
      UtilizadoresService.getUtilizadoresAll().then((data) => {
        var role,
          budgetUtilizado,
          budgetPendente,
          formacoesFeitas = 0,
          formacoesPendentes = 0,
          budgetRestante = 0,
          id;
        const dataHandled = [];
        var colaborador = {};

        for (var c = 0; c < data.length; c++) {
          if (!data[c].isAdministrador) {
            formacoesFeitas = 0;
            formacoesPendentes = 0;
            budgetUtilizado = 0;
            budgetPendente = 0;
            budgetRestante = 0;

            var nome = data[c].nome;
            var email = data[c].email;
            var id = data[c].id;

            if (data[c].isColaborador) {
              role = "Colaborador";
            }

            if (data[c].isGestor) {
              role = "manager";
            }

            if (data[c].listaFormacoesHandled.length != 0) {
              for (
                var i = 0;
                i < data[c].listaFormacoesHandled.listaFormacoes.length;
                i++
              ) {
                var formacao = data[c].listaFormacoesHandled.listaFormacoes[i];
                if (formacao.tipoFormacao == "TERMINADA") {
                  formacoesFeitas++;
                  budgetUtilizado += parseInt(formacao.preco);
                }
                if (formacao.tipoFormacao == "PENDENTE") {
                  formacoesPendentes++;
                  budgetPendente += parseInt(formacao.preco);
                }
              }
            }
            budgetRestante = data[c].BudgetRestante.budget;
            colaborador = {
              id: id,
              nome: nome,
              email: email,
              budgetUsed: budgetUtilizado,
              role: role,
              numFormacao: formacoesFeitas,
              numFormacaoPendentes: formacoesPendentes,
              emAprovacao: budgetPendente,
              budgetRestante: budgetRestante,
              // SUBSTITUIR O LogoGrama PELA IMAGEM PERSONALIZADA
              imgUrl: LogoGrama,
            };

            dataHandled.push(colaborador);

            setDataColaborators(dataHandled);
          }
        }
      });
    }
    //Se o user logado for Gestor só aparecem os colaboradores associados a ele
    else if (user.isGestor) {
      ColaboradoresService.getColaboradoresAll().then((data) => {
        var role,
          budgetUtilizado,
          budgetPendente,
          formacoesFeitas,
          formacoesPendentes,
          budgetRestante = 0,
          id;
        const dataHandled = [];
        var colaborador = {};

        for (var c = 0; c < data.length; c++) {
          //verifica se o colaborador tem o mesmo managerID que o gestor logado
          if (user.id == data[c].managerId) {
            formacoesFeitas = 0;
            formacoesPendentes = 0;
            budgetUtilizado = 0;
            budgetPendente = 0;
            budgetRestante = 0;

            var nome = data[c].nome;
            var email = data[c].email;
            var id = data[c].id;

            if (data[c].isColaborador) {
              role = "Colaborador";
            }

            if (data[c].listaFormacoesHandled.length != 0) {
              for (
                var i = 0;
                i < data[c].listaFormacoesHandled.listaFormacoes.length;
                i++
              ) {
                var formacao = data[c].listaFormacoesHandled.listaFormacoes[i];
                if (formacao.tipoFormacao == "TERMINADA") {
                  formacoesFeitas++;
                  budgetUtilizado += parseInt(formacao.preco);
                }
                if (formacao.tipoFormacao == "PENDENTE") {
                  formacoesPendentes++;
                  budgetPendente += parseInt(formacao.preco);
                }
              }
            }
            budgetRestante = data[c].BudgetRestante.budget;
            colaborador = {
              id: id,
              nome: nome,
              email: email,
              budgetUsed: budgetUtilizado,
              role: role,
              numFormacao: formacoesFeitas,
              numFormacaoPendentes: formacoesPendentes,
              emAprovacao: budgetPendente,
              budgetRestante: budgetRestante,
            };

            dataHandled.push(colaborador);

            setDataColaborators(dataHandled);
          }
        }
      });
    }
  }, []);

  const handleExcluir = (u) => {
    setModal({
      show: true,
      data: "EXCLUIR",
    });
  };

  const handleAdicionar = () => {
    navigate("/home/controlo/colaboradores/adicionar-colaborador");
  };

  const handleType = (index, event) => {
    setSearch(event.target.value);
  };

  const onItemClick = (e) => {
    if (e === "all") {
      setFilteredData(dataColaborators);
    } else {
      const result = dataColaborators.filter((item) => item.gender === e);

      setFilteredData(result);
    }
  };

  const onSearchbarChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setFilteredData(dataColaborators);
    } else {
      if (filteredData.length > 0) {
        const result = filteredData.filter((item) => item.nome === value);
        setFilteredData(result);
      } else {
        const result = dataColaborators.filter((item) => item.nome === value);

        setFilteredData(result);
      }
    }
  };

  return (
    <div className="pl-8 pr-8 h-full overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="sticky top-5">
          <h1 className="text-white font-bold text-3xl pt-8 pl-8">
            Gestão de Colaboradores
          </h1>
        </div>

        <div className="flex flex-col pt-4 pl-4 pr-8 mx-auto w-full">
          <Table columns={columns} data={dataColaborators} />
          {/*
            <TableV2 columns={columns} data={filteredData.length > 0 ? filteredData : dataColaborators}/>*/}
        </div>
    </div>
    </div>
  );
}
