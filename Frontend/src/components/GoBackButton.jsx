import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

export default function GoBackButton({url}) {
  const navigate = useNavigate();
  const goBack = () => {
    //navigate("/home/controlo/colaboradores");
    navigate(url);
  };

  return (
    <div
      className="flex flex-row items-center justify-center gap-2 text-gray4 cursor-pointer"
      onClick={goBack}
    >
      <ArrowLeft className="w-4 h-4 order-none" />
      <p className="font-IBM font-normal text-xs lowercase order-1">Voltar</p>
    </div>
  );
}
