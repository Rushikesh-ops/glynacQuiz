import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';
import axios from 'axios';

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,       // For bar chart
  BarController,    // For bar chart controller
  Title,
  Tooltip,
  Legend
);

function SalaryDistributionChart() {
  const [salaryData, setSalaryData] = useState([]);
  const chartRef = useRef(null);  // To store chart instance reference
  const canvasRef = useRef(null); // To reference the canvas element

  useEffect(() => {
    // Fetch salary distribution data by department
    axios.get('http://localhost:8000/api/salary-distribution/')
      .then(response => {
        setSalaryData(response.data);
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
      type: 'bar', // Bar chart type
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

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [salaryData]);

  return (
    <div>
      <h3>Salary Distribution by Department</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default SalaryDistributionChart;
