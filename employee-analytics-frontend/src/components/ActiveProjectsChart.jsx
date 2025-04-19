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

function ActiveProjectsChart() {
  const [activeProjects, setActiveProjects] = useState(0);

  useEffect(() => {
    axios.get('/api/active_projects/')
      .then(response => {
        setActiveProjects(response.data.active_projects);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('activeProjectsChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'pie',
      data: {
        labels: ['Active Projects'],
        datasets: [{
          label: 'Active Projects Count',
          data: [activeProjects, 100 - activeProjects],
          backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(192,75,75,0.2)'],
          borderColor: ['rgba(75,192,192,1)', 'rgba(192,75,75,1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Active Projects Summary'
          }
        }
      }
    });
  }, [activeProjects]);

  return <canvas id="activeProjectsChart" width="400" height="200"></canvas>;
}

export default ActiveProjectsChart;
