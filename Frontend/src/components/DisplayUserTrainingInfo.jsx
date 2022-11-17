import React from "react";

export default function DisplayUserTrainingInfo(props) {
  return (
    <>
      <div className="flex flex-col justify-center items-start gap-4 order-1">
        <span className="trainingInformation order-none">
          <strong>Budget disponível: </strong>
          {props.info.budgetDisponivel}
        </span>
        <span className="trainingInformation order-1">
          <strong>Budget em aprovação: </strong>
          {props.info.budgetAprovacao}
        </span>
      </div>
      <div className="flex flex-col justify-end items-start gap-4 order-2">
        <span className="trainingInformation order-1">
          <strong>Departamento: </strong>
          {props.info.departamento}
        </span>
        <span className="trainingInformation order-1">
          <strong>Formações realizadas: </strong>
          {props.info.realizadas}
        </span>
        <span className="trainingInformation order-1">
          <strong>Formações rejeitadas: </strong>
          {props.info.rejeitadas}
        </span>
        <span className="trainingInformation order-1">
          <strong>Formações a decorrer: </strong>
          {props.info.decorrer}
        </span>
      </div>
    </>
  );
}
