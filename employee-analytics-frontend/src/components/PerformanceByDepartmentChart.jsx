import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register necessary components for the chart
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
  const chartRef = useRef(null); // Ref to store the chart instance
  const canvasRef = useRef(null); // Ref to store the canvas element

  useEffect(() => {
    // Fetch performance data by department
    axios.get('http://localhost:8000/api/performance-by-department/')
      .then(response => {
        setPerformanceByDepartment(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new bar chart with updated data
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'bar', // Bar chart type
      data: {
        labels: performanceByDepartment.map(department => department.employee__department), // Department labels
        datasets: [{
          label: 'Average Rating',
          data: performanceByDepartment.map(department => department.avg_rating), // Ratings
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

    // Cleanup function to destroy chart on component unmount or data change
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [performanceByDepartment]); // Re-run effect when performanceByDepartment changes

  return (
    <div>
      <h3>Performance Reviews by Department</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default PerformanceByDepartmentChart;
