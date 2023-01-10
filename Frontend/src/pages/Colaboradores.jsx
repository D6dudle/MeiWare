import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";
import TrainingUserInfo from "../components/TrainingUserInfo";
import TextInput from "../components/TextInput";
import users from "../constants/usersAux"; // Remove later
import Modal from "../components/Modal";
import {getColumnsTable } from "../constants/tabelaUtilizadores";
import Table from "../components/TableComponent/Table";
import ColaboradoresService from "../services/get-colaboradores.service";
import UserService from "../services/user.service";
import UtilizadoresService from "../services/get-utilizadores.service";

export default function Colaboradores() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(true); // true = asc && false = desc
  const [usersList, setUsers] = useState(users);
  const [actualUser, setUser] = useState(usersList[0]);
  const [search, setSearch] = useState();
  const [modal, setModal] = useState({ show: false, data: null });

  const [dataColaborators, setDataColaborators] = useState([]);
  const columns = React.useMemo(() => getColumnsTable(), []);

  const handleCloseModal = () => {
    setModal({ show: false, data: null });
  };

  const confirmeActionModal = (u) => {
    console.log("Vou excluir o colaborador");
    setUsers(usersList.filter((user) => u.email !== user.email));
    setUser(users[0]);
    setModal({ show: false, data: null });
  };

  useEffect(() => {
    const user = UserService.getCurrentUser();
    if(user.isAdministrador) {
      console.log("O USER É ADMIN -> A IMPRIMIR ALL COLABORADORES");

      UtilizadoresService.getUtilizadoresAll().then((data)=>{
        var role, budgetUtilizado, budgetPendente, formacoesFeitas = 0, formacoesPendentes = 0, id;
        const dataHandled = [];
        var colaborador = {};

        for(var c = 0; c < data.length; c++){
          if(!data[c].isAdministrador){
            
            formacoesFeitas = 0;
            formacoesPendentes = 0;
            budgetUtilizado = 0;
            budgetPendente = 0;

            var nome = data[c].nome;
            var email = data[c].email;
            var id = data[c].id;


            if(data[c].isColaborador){
              role = "Colaborador";
            }

            if(data[c].isGestor){
              role = "manager";
            }
            
          
            if(data[c].listaFormacoesHandled.length != 0){

              for(var i = 0; i < data[c].listaFormacoesHandled.listaFormacoes.length; i++){
                var formacao = data[c].listaFormacoesHandled.listaFormacoes[i];
                if(formacao.tipoFormacao == 'TERMINADA'){
                  formacoesFeitas++;
                  budgetUtilizado += parseInt(formacao.preco);

                  
                }
                if(formacao.tipoFormacao == 'PENDENTE'){
                  formacoesPendentes++;
                  budgetPendente += parseInt(formacao.preco);
                }
              }
            }

            
            colaborador = { "id": id,
                            "nome": nome, 
                            "email": email, 
                            "budgetUsed": budgetUtilizado, 
                            "role": role, 
                            "numFormacao": formacoesFeitas, 
                            "numFormacaoPendentes": formacoesPendentes,
                            "emAprovacao": budgetPendente
                          };

            dataHandled.push(colaborador);

            setDataColaborators(dataHandled);

          }



        }
      });
    }
    //Se o user logado for Gestor só aparecem os colaboradores associados a ele
    else if(user.isGestor) {

      console.log("O user é gestor");
      ColaboradoresService.getColaboradoresAll().then((data)=>{
        var role, budgetUtilizado, budgetPendente, formacoesFeitas, formacoesPendentes, id;
        const dataHandled = [];
        var colaborador = {};

        for(var c = 0; c < data.length; c++){
          //verifica se o colaborador tem o mesmo managerID que o gestor logado
          if(user.id == data[c].managerId){

            formacoesFeitas = 0;
            formacoesPendentes = 0;
            budgetUtilizado = 0;
            budgetPendente = 0;

            var nome = data[c].nome;
            var email = data[c].email;
            var id = data[c].id;


            if(data[c].isColaborador){
              role = "Colaborador";
            }
            
          
            if(data[c].listaFormacoesHandled.length != 0){

              for(var i = 0; i < data[c].listaFormacoesHandled.listaFormacoes.length; i++){
                var formacao = data[c].listaFormacoesHandled.listaFormacoes[i];
                if(formacao.tipoFormacao == 'TERMINADA'){
                  formacoesFeitas++;
                  budgetUtilizado += parseInt(formacao.preco);

                  
                }
                if(formacao.tipoFormacao == 'PENDENTE'){
                  formacoesPendentes++;
                  budgetPendente += parseInt(formacao.preco);
                }
              }
            }
            
            colaborador = { "id": id,
                            "nome": nome, 
                            "email": email, 
                            "budgetUsed": budgetUtilizado, 
                            "role": role, 
                            "numFormacao": formacoesFeitas, 
                            "numFormacaoPendentes": formacoesPendentes,
                            "emAprovacao": budgetPendente
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

  return (
    <div className="w-full h-full overflow-scroll scrollbar-hide">
      <h1 className="text-white font-bold text-3xl pt-8 pl-8">
        Gestão de Colaboradores
      </h1>

      <div className="pt-8 pl-4 pr-8">
        <div className="pr-8">        
          

          <div className="flex md:flex-row flex-col justify-evenly md:justify-between md:items-center items-start gap-8 pt-2">

            <div className="flex gap-14">
              <button
                className="actionButtons bg-error"
                onClick={() => handleExcluir(actualUser)}
              >
                <Minus className="w-4 h-4 text-black" />
                <p className="actionBtnInsideInfo">Excluir colaborador</p>
              </button>
              {modal.show && (
                <Modal
                  closeModal={handleCloseModal}
                  confirmeActionModal={() => confirmeActionModal(actualUser)}
                  data={modal.data}
                />
              )}

              <button
                className="actionButtons bg-primary"
                onClick={() => handleAdicionar()}
              >
                <Plus className="w-4 h-4 text-black" />
                <p className="actionBtnInsideInfo">Adicionar colaborador</p>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 pl-4 pr-8 mx-auto">
            <Table columns={columns} data={dataColaborators}/>
        </div>

      </div>
    </div>
  );
}
