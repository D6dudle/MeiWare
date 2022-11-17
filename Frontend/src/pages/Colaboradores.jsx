import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Minus, Plus } from "react-feather";
import usersList from "../constants/usersAux";
import TrainingUserInfo from "../components/TrainingUserInfo";

export default function Colaboradores() {
  const [open, setOpen] = useState(false); // Is username list open?
  const [actualUser, setUser] = useState(null);

  return (
    <>
      <h1 className="font-IBM font-bold text-2xl text-white leading-tight relative left-[2%] top-[5%]">
        Gestão de Colaboradores
      </h1>

      {/* TODO: Falta a barra de pesquisa */}

      <div className="relative top-12 left-8">
        <div className="flex flex-row justify-between items-center gap-8">
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
            <button className="actionButtons bg-error" onClick={() => {}}>
              <Minus className="w-4 h-4 text-black" />
              <p className="actionBtnInsideInfo">Excluir colaborador</p>
            </button>
            <button className="actionButtons bg-primary" onClick={() => {}}>
              <Plus className="w-4 h-4 text-black" />
              <p className="actionBtnInsideInfo">Adicionar colaborador</p>
            </button>
          </div>
        </div>
      </div>

      <div className="relative top-16 left-8 flex flex-row items-start gap-4">
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
    </>
  );
}
