import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import './PieChart.css'

const PieChart = ({ spendAmount, remainingAmount }) => {
    const totalAmount = parseFloat(spendAmount) + parseFloat(remainingAmount);
  const spendPercentage = ((spendAmount / totalAmount) * 100).toFixed(2);
  const remainingPercentage = ((remainingAmount / totalAmount) * 100).toFixed(2);

  const data = {
    labels: [`Spend Amount (${spendPercentage}%)`, `Remaining Amount (${remainingPercentage}%)`],
    datasets: [
      {
        label: "Budget",
        data: [spendAmount, remainingAmount],
        backgroundColor: ["#ff9900", "#232f3e"],
        borderColor: ["#ff9900", "#232f3e"],
        borderWidth: 2
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem, data) {
            let label = data.labels[tooltipItem.index] || '';

            if (label) {
              label += ': ';
            }
            label += Math.round(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="pie-chart-container">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart;
