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

function PerformanceByDepartmentChart() {
  const [performanceByDepartment, setPerformanceByDepartment] = useState([]);

  useEffect(() => {
    axios.get('/api/performance_by_department/')
      .then(response => {
        setPerformanceByDepartment(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('performanceByDepartmentChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: performanceByDepartment.map(department => department.employee__department),
        datasets: [{
          label: 'Average Rating',
          data: performanceByDepartment.map(department => department.avg_rating),
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
            text: 'Performance Reviews by Department'
          }
        }
      }
    });
  }, [performanceByDepartment]);

  return <canvas id="performanceByDepartmentChart" width="400" height="200"></canvas>;
}

export default PerformanceByDepartmentChart;
