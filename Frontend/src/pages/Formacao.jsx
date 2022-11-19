import React from "react";
import { Outlet } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Formacao() {
  const percentage = 66;
  /* https://codesandbox.io/s/vymm4oln6y?file=%2FAnimatedProgressProvider.js */

  return (
    <div>
      <div className="w-36 font-extrabold text-2xl">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "white",
            pathColor: "#ECC039",
            trailColor: "#FFEFA1",
            textSize: "28px"
          })}
        />
      </div>
    </div>
  );
}
