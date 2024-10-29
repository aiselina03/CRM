import React from "react";
import Chart1 from "../../components/Chart1";
import MyDoughnutChart from "../../components/Chart2";
import "./style.scss";
import Chart3 from "../../components/Chart3";
import Chart4 from "../../components/Chart4";
import PolarAreaChart from "../../components/Chart5";
import MixedChart from "../../components/Chart6";

function Dashboard() {
  return (
    <div className="dashboard">
      <MyDoughnutChart></MyDoughnutChart>
      <Chart1></Chart1>
      <Chart3 />
      <Chart4></Chart4>
      <PolarAreaChart></PolarAreaChart>
      <MixedChart></MixedChart>
    </div>
  );
}

export default Dashboard;
