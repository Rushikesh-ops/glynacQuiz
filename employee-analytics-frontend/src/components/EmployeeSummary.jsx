import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getEmployeeSummary } from '../api';
// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function EmployeeSalaryChart() {

  const [summary, setSummary] = useState({});

  useEffect(() => {

    const fetchSummary = async () => {
      const summaryData = await getEmployeeSummary();
      setSummary(summaryData);
    };
    fetchSummary();

    const ctx = document.getElementById('salaryChart').getContext('2d');

    const salaryChart = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: ['Alice', 'Bob', 'Carol', 'Dave'], // Example employee names
        datasets: [
          {
            label: 'Salary',
            data: [85000, 72000, 62000, 95000], // Example salary values
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Employee Salary Chart'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `Salary: $${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    });

    // Cleanup the chart on component unmount
    return () => {
      salaryChart.destroy();
    };
  }, []);

  return (
    <div>
          <div>
      <h2>Salary Summary</h2>
      <p>Average Salary: ${summary.avg_salary}</p>
      <p>Max Salary: ${summary.max_salary}</p>
      <p>Min Salary: ${summary.min_salary}</p>
    </div>
    
      <h2>Employee Salary Chart</h2>
      <canvas id="salaryChart" width="400" height="200"></canvas>
    </div>
  );
}

export default EmployeeSalaryChart;

