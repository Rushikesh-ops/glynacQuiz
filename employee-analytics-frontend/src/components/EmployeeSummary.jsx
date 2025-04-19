import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController, // Add this import for LineController
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register all necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,  // Register LineController
  Title,
  Tooltip,
  Legend
);

function EmployeeSalaryChart() {
  const [summary, setSummary] = useState({
    avg_salary: 0,
    max_salary: 0,
    min_salary: 0
  });

  const chartRef = useRef(null); // 👈 Reference to the chart instance
  const canvasRef = useRef(null); // 👈 Reference to the canvas element

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/summary/salary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching salary summary:', error);
      }
    };

    fetchSummary();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 💥 Destroy existing chart before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'line', // Type of chart
      data: {
        labels: ['Min Salary', 'Avg Salary', 'Max Salary'],
        datasets: [
          {
            label: 'Salary ($)',
            data: [
              summary.min_salary,
              summary.avg_salary,
              summary.max_salary
            ],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Employee Salary Chart'
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `Salary: $${tooltipItem.raw}`
            }
          }
        }
      }
    });

    // Cleanup function to destroy the chart
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [summary]);

  return (
    <div>
      <h2>Salary Summary</h2>
      <p>Average Salary: ${summary.avg_salary}</p>
      <p>Max Salary: ${summary.max_salary}</p>
      <p>Min Salary: ${summary.min_salary}</p>

      <h2>Salary Comparison Chart</h2>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default EmployeeSalaryChart;
