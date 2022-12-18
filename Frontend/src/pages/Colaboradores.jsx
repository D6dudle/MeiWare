import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";
import TrainingUserInfo from "../components/TrainingUserInfo";
import TextInput from "../components/TextInput";
import users from "../constants/usersAux"; // Remove later
import Modal from "../components/Modal";

export default function Colaboradores() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(true); // true = asc && false = desc
  const [usersList, setUsers] = useState(users);
  const [actualUser, setUser] = useState(usersList[0]);
  const [search, setSearch] = useState();
  const [modal, setModal] = useState({ show: false, data: null });

  const handleCloseModal = () => {
    setModal({ show: false, data: null });
  };

  const confirmeActionModal = (u) => {
    console.log("Vou excluir o colaborador");
    setUsers(usersList.filter((user) => u.email !== user.email));
    setUser(users[0]);
    setModal({ show: false, data: null });
  };

  /*ZONA dE TESTES*/

  const getColaboradores = () => {
    axios
      .get("http://localhost:8080/api/utilizador/colaboradores")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});

    return [];
  };

  const [data, setData] = useState(() => getColaboradores(), []);

  const teste =
    (() => {
      console.log("data --> ", data);
    },
    [data]);

  const teste2 =
    (() => {
      console.log("<-- print --> ");
    },
    []);
  /*ZONA dE TESTES*/

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

  const handleName = () => {
    setOrder(!order);
  };

  return (
    <div className="w-full h-full overflow-hidden ml-8 mr-8">
      <h1 className="text-white font-bold text-3xl mt-8">
        Gestão de Colaboradores
      </h1>

      <div className="overflow-scroll scrollbar-hide h-full mt-16 ml-8 mr-8 pr-8">
        <div>
          <TextInput
            index={1}
            name={"pesquisa..."}
            type={"searchbar"}
            placeholder="colaborador..."
            style={"md:w-[100%] w-[15rem]"}
            showTitle={false}
            value={search}
            callback={handleType}
          />

          <div className="flex md:flex-row flex-col justify-evenly md:justify-between md:items-center items-start gap-8 mt-2">
            <div className="flex gap-1">
              <button className="btnSearchFunc" onClick={handleName}>
                <p className="btnIcons leading-[120%]">Nome colaborador</p>
                {order ? (
                  <ChevronDown className="w-4 h-4 btnIcons" />
                ) : (
                  <ChevronUp className="w-4 h-4 btnIcons" />
                )}
              </button>
              <button className="btnSearchFunc">
                <p className="btnIcons ">Mais filtros</p>
                <Filter className="w-4 h-4 btnIcons" />
              </button>
            </div>

            <div className="flex gap-2">
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

        <div className="relative top-16 left-8 flex sm:flex-col md:flex-col lg:flex-row items-start gap-4">
          <ul className="overflow-y-auto w-max order-none">
            {usersList.map((list, index) => (
              <li
                key={index}
                className={`usersList ${
                  actualUser != null &&
                  actualUser.name == list.name &&
                  "bg-gray2"
                }`}
                onClick={() => {
                  setUser(list);
                }}
              >
                <img
                  src={list.photo}
                  className={`self-center w-5 h-5 border-[0.031rem] border-solid border-primary rounded-[1.875rem]`}
                />
                <p className="font-IBM font-normal text-base text-white">
                  {list.name}
                </p>
              </li>
            ))}
          </ul>

          {actualUser && <TrainingUserInfo user={actualUser} />}
        </div>
      </div>
    </div>
  );
}
