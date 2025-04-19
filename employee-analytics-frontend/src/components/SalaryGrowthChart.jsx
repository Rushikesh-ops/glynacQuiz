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

function SalaryGrowthChart() {
  const [growthData, setGrowthData] = useState([]);
  const chartRef = useRef(null);  // Ref for the chart instance
  const canvasRef = useRef(null); // Ref for the canvas element

  useEffect(() => {
    // Fetch salary growth data
    axios.get('http://localhost:8000/api/salary-growth/')
      .then(response => {
        setGrowthData(response.data);
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
        labels: growthData.map(employee => employee.name),
        datasets: [{
          label: 'Initial vs Current Salary Growth',
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

    // Cleanup function to destroy chart on component unmount or data change
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [growthData]); // Re-run the effect when growthData changes

  return (
    <div>
      <h3>Salary Growth Chart</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default SalaryGrowthChart;
