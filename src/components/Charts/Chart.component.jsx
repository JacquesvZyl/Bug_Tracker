import React from "react";
import styles from "./Chart.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        boxWidth: 10,
      },
    },
  },
};
function Chart({ data }) {
  return (
    <div className={styles.chart}>
      <h3>{data.datasets[0].label}</h3>
      <Doughnut data={data} options={options} width={200} height={200} />
    </div>
  );
}

export default Chart;
