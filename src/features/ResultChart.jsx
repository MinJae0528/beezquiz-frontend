// src/features/ResultChart.jsx

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export default function ResultChart({ participants, totalQuestions }) {
  const labels = participants.map((p) => p.nickname);
  const scores = participants.map((p) => p.score);

  const data = {
    labels,
    datasets: [
      {
        label: "정답 개수",
        data: scores,
        backgroundColor: "#FECF4F",
        borderColor: "#81491c",
        borderWidth: 2,
        borderRadius: 20,
        datalabels: {
          align: "right",
          anchor: "end",
          color: "#81491c",
          font: {
            weight: "bold",
            size: 16,
          },
          formatter: (value) => {
            const total = totalQuestions.toString().padStart(2, "0");
            const score = value.toString().padStart(2, "0");
            return `${score}/${total}`;
          },
        },
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { clip: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: totalQuestions,
        ticks: { stepSize: 1, color: "#81491c" },
        grid: { color: "#f0e9c0" },
      },
      y: {
        ticks: {
          color: "#81491c",
          font: { weight: "bold", size: 14 },
        },
      },
    },
  };

  return (
    <div className="w-full max-h-[300px] overflow-y-auto px-4">
      <div style={{ height: `${Math.max(participants.length * 60, 300)}px` }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
