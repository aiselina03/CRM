import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./style.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

function PolarAreaChart() {
  const data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Polar Area Chart Example",
      },
    },
  };

  return (
    <div className="polar-area-chart">
      <h2>Polar Area Chart</h2>
      <PolarArea data={data} options={options} />
    </div>
  );
}

export default PolarAreaChart;
