import { Line } from "react-chartjs-2";
import "chart.js/auto";

function ECGChart({ signal }) {
  const data = {
    labels: signal.map((_, i) => i),
    datasets: [
      {
        label: "ECG Signal",
        data: signal,
        borderColor: "#00e676",
        borderWidth: 2.5,
        pointRadius: 0,
        tension: 0.15,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(0, 230, 118, 0.12)");
          gradient.addColorStop(1, "rgba(0, 230, 118, 0)");
          return gradient;
        }
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false, grid: { display: false } },
      y: {
        min: -0.4,
        max: 1.2,
        display: false,
        grid: { display: false }
      }
    }
  };

  return (
    <div className="ecg-card">
      <div className="ecg-header">
        <span className="ecg-title">ECG Waveform</span>
        <span className="ecg-live-badge">
          <span className="ecg-live-dot"></span>
          Live
        </span>
      </div>
      <div className="ecg-chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default ECGChart;