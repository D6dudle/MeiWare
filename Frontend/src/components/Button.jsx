import React from "react";
import { Eye, Edit, XCircle, CheckCircle } from "react-feather";

/** @component Este componente é repossável por adicionar os botões ao retângulo de cada formação*/

export const Button = ({ iconName, textButton }) => {
  const getIcon = [
    {
      name: "CONSULTAR",
      icon: Eye,
      background: "transparent border-[1.5px]",
      borderColor: "gray3",
      textColor: "white",
      focus: "primary",
    },
    {
      name: "EDITAR",
      icon: Edit,
      background: "transparent border-[1.5px]",
      borderColor: "gray3",
      textColor: "white",
      focus: "primary",
    },
    {
      name: "CANCELAR",
      icon: XCircle,
      background: "error",
      borderColor: "lightError",
      textColor: "darkBlack",
      focus: "white",
    },
    {
      name: "FINALIZAR",
      icon: CheckCircle,
      background: "primary",
      borderColor: "primary",
      textColor: "darkBlack",
      focus: "shadow-btn",
    },
  ];
  const icon = getIcon.find(({ name }) => name === iconName) || {};

  return (
    <button
      className={`flex items-center px-4 py-2  bg-${icon.background} text-${icon.textColor} border-${icon.borderColor} font-semibold text-sm rounded-sm  hover:bg-${icon.borderColor}  active:bg-${icon.background} active:shadow-inner focus:border-${icon.focus}`}
    >
      <icon.icon className={`w-5 h-5 ${icon.icon !== Eye && "mr-2"}`} />
      {textButton}
    </button>
  );
};
