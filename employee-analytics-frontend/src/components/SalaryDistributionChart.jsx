import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalaryDistributionChart() {
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    axios.get('/api/salary_distribution_by_department/')
      .then(response => {
        setSalaryData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('salaryDistributionChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: salaryData.map(department => department.department),
        datasets: [{
          label: 'Average Salary',
          data: salaryData.map(department => department.avg_salary),
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Salary Distribution by Department'
          }
        }
      }
    });
  }, [salaryData]);

  return <canvas id="salaryDistributionChart" width="400" height="200"></canvas>;
}

export default SalaryDistributionChart;
