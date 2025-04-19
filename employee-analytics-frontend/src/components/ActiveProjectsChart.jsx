import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend, PieController } from 'chart.js';
import axios from 'axios';

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,      // Required for pie chart
  PieController,   // Required for pie chart controller
  Title,
  Tooltip,
  Legend
);

function ActiveProjectsChart() {
  const [activeProjects, setActiveProjects] = useState(0);
  const chartRef = useRef(null); // To store chart instance reference
  const canvasRef = useRef(null); // To reference the canvas element

  useEffect(() => {
    // Fetch active project count data
    axios.get('http://localhost:8000/api/active-projects/')
      .then(response => {
        setActiveProjects(response.data.active_projects);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart before creating a new one to avoid memory leaks or issues with canvas reuse
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'pie', // Pie chart type
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

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [activeProjects]);

  return (
    <div>
      <h3>Active Projects Summary</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default ActiveProjectsChart;
