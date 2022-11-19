import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";
import TrainingUserInfo from "../components/TrainingUserInfo";
import users from "../constants/usersAux"; // Remove later

export default function Colaboradores() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Is username list open?
  const [actualUser, setUser] = useState(null);
  const [usersList, setUsers] = useState(users);

  const handleExcluir = (u) => {
    setUsers(users.filter((user) => u.email !== user.email));
    setUser(users[0]);
  };

  const handleAdicionar = () => {
    navigate("/home/controlo/colaboradores/adicionar-colaborador");
  };

  return (
    <div className="ml-8 mr-8">
      <h1 className="text-white font-bold text-3xl mt-8">
        Gestão de Colaboradores
      </h1>

      {/* TODO: Falta a barra de pesquisa */}

      <div className="mt-16 ml-8 mr-8">
        {/* TODO: Corrigir valores depois com a barra de pesquisa. ^ */}
        <div className="flex md:flex-row flex-col justify-evenly md:justify-between md:items-center items-start gap-8">
          <div className="flex gap-1">
            <button
              className="btnSearchFunc"
              onClick={() => {
                if (open) {
                  setUser(null);
                } else {
                  setUser(usersList[0]);
                }
                setOpen(!open);
              }}
            >
              <p className="btnIcons leading-[120%]">Nome colaborador</p>
              {open ? (
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
            {open && (
              <button
                className="actionButtons bg-error"
                onClick={() => handleExcluir(actualUser)}
              >
                <Minus className="w-4 h-4 text-black" />
                <p className="actionBtnInsideInfo">Excluir colaborador</p>
              </button>
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
        <ul className={`overflow-y-auto w-max order-none ${!open && "hidden"}`}>
          {usersList.map((list, index) => (
            <li
              key={index}
              className={`usersList ${
                actualUser != null && actualUser.name == list.name && "bg-gray2"
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

        {/* TODO: Outra seach bar aqui */}
      </div>
    </div>
  );
}
