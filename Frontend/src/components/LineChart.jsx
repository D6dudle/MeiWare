import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: "rgba(236, 192, 57, 1)",
      borderColor: "white",
      data: [0, 10, 5, 2, 20, 30, 45],
      tension: 0.3,
    },
  ],
};


export const LineChart = () => {
    return (
      <div>
        <Line data={data}
       options={{
        plugins: {
          legend: {
            display: false,
          },           
        }, 
        scales: {
          x: {
             display: false,
          },
          y: {
             display: false,
          }
       },
      }} />
      </div>
    );
  };

  
