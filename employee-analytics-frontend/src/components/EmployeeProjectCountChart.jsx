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

function EmployeeProjectCountChart() {
  const [employeeProjectCount, setEmployeeProjectCount] = useState([]);
  const chartRef = useRef(null);  // Ref to store the chart instance
  const canvasRef = useRef(null); // Ref to store the canvas element

  useEffect(() => {
    // Fetch employee project count data
    axios.get('http://localhost:8000/api/employee-project-count/')
      .then(response => {
        setEmployeeProjectCount(response.data);
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

    // Cleanup function to destroy chart on component unmount or data change
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [employeeProjectCount]); // Re-run the effect when employeeProjectCount changes

  return (
    <div>
      <h3>Employee Project Count Chart</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default EmployeeProjectCountChart;
