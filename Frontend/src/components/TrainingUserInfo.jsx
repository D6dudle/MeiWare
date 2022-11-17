import React, { useState } from "react";
import TrainingDescription from "../components/TrainingDescription";
import DisplayUserTrainingInfo from "../components/DisplayUserTrainingInfo";

export default function TrainingUserInfo(props) {
  var user = props.user;
  return (
    <div className="flex flex-col items-start py-4 px-4 gap-5 order-1">
      <div className="flex flex-row justify-between items-start gap-[3.188rem] order-none">
        <div className="items-start gap-[0.313rem]">
          <p className="font-IBM font-bold text-3xl text-gray4 order-none">
            {user.name}
          </p>
          <p className="font-IBM font-normal text-xs text-gray4 order-1">
            {user.email}
          </p>
          <TrainingDescription />
        </div>
        <DisplayUserTrainingInfo info={user.info} />
      </div>
    </div>
  );
}
