import React from "react";

export default function TrainingDescription() {
  return (
    <ul className="flex flex-col items-start py-[0.625rem] px-0 order-2 gap-[0.625rem]">
      <li className="trainingCircleDiv">
        <span className="w-3 h-3 rounded-full text-primary bg-primary"></span>
        <p className="trainingCircleText">Formação terminada</p>
      </li>
      <li className="trainingCircleDiv">
        <span className="w-3 h-3 rounded-full text-error bg-error"></span>
        <p className="trainingCircleText">Formação rejeitada</p>
      </li>
      <li className="trainingCircleDiv">
        <span className="w-3 h-3 rounded-full text-success bg-success"></span>
        <p className="trainingCircleText">Formação terminada</p>
      </li>
      <li className="trainingCircleDiv">
        <span className="w-3 h-3 rounded-full text-white bg-white"></span>
        <p className="trainingCircleText">Formação terminada</p>
      </li>
    </ul>
  );
}
