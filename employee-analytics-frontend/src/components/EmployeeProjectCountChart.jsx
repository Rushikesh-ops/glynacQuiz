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

function EmployeeProjectCountChart() {
  const [employeeProjectCount, setEmployeeProjectCount] = useState([]);

  useEffect(() => {
    axios.get('/api/employee_and_project_count/')
      .then(response => {
        setEmployeeProjectCount(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('employeeProjectCountChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: employeeProjectCount.map(employee => employee.name),
        datasets: [{
          label: 'Number of Projects Assigned',
          data: employeeProjectCount.map(employee => employee.project_count),
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
            text: 'Employee Project Count'
          }
        }
      }
    });
  }, [employeeProjectCount]);

  return <canvas id="employeeProjectCountChart" width="400" height="200"></canvas>;
}

export default EmployeeProjectCountChart;
