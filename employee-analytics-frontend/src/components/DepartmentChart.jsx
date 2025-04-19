import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DepartmentCountChart() {
  useEffect(() => {
    const ctx = document.getElementById('departmentCountChart').getContext('2d');

    const departmentCountChart = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['HR', 'IT', 'Sales', 'Marketing', 'Finance'],
        datasets: [
          {
            label: 'Department Count',
            data: [5, 12, 7, 4, 9], // Example counts for each department
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Department Count'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.raw} employees`;
              }
            }
          }
        }
      }
    });

    // Cleanup the chart on component unmount
    return () => {
      departmentCountChart.destroy();
    };
  }, []);

  return (
    <div>
      <h2>Department Count</h2>
      <canvas id="departmentCountChart" width="400" height="200"></canvas>
    </div>
  );
}

export default DepartmentCountChart;
