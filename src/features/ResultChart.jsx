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

// Chart.js에 필요한 요소 등록
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
        backgroundColor: "#FECF4F", // 꿀색
        borderColor: "#81491c", // 테두리색
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
    indexAxis: "y", // ✅ 가로 막대 그래프
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }, // 툴팁 비활성화
      datalabels: {
        clip: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: totalQuestions,
        ticks: {
          stepSize: 1,
          color: "#81491c",
        },
        grid: {
          color: "#f0e9c0",
        },
      },
      y: {
        ticks: {
          color: "#81491c",
          font: {
            weight: "bold",
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] px-4">
      <Bar data={data} options={options} />
    </div>
  );
}
