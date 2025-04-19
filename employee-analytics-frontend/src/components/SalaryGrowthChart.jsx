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

function SalaryGrowthChart() {
  const [growthData, setGrowthData] = useState([]);

  useEffect(() => {
    axios.get('/api/salary_growth/')
      .then(response => {
        setGrowthData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('salaryGrowthChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: growthData.map(employee => employee.name),
        datasets: [{
          label: 'Initial vs Current Salary',
          data: growthData.map(employee => employee.salary - employee.initial_salary),
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
            text: 'Salary Growth (Current vs Initial)'
          }
        }
      }
    });
  }, [growthData]);

  return <canvas id="salaryGrowthChart" width="400" height="200"></canvas>;
}

export default SalaryGrowthChart;
