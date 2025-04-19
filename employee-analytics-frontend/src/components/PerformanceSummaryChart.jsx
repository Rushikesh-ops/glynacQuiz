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

function PerformanceSummaryChart() {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    axios.get('/api/performance_summary/')
      .then(response => {
        setPerformanceData([response.data.avg_rating]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('performanceSummaryChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels: ['Average Rating'],
        datasets: [{
          label: 'Performance Rating',
          data: performanceData,
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
            text: 'Performance Summary'
          }
        }
      }
    });
  }, [performanceData]);

  return <canvas id="performanceSummaryChart" width="400" height="200"></canvas>;
}

export default PerformanceSummaryChart;
