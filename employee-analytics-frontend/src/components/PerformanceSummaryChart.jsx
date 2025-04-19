import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';
import axios from 'axios';

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,  // Register the BarController
  Title,
  Tooltip,
  Legend
);

function PerformanceSummaryChart() {
  const [performanceData, setPerformanceData] = useState([0]); // Default value is 0 in case the data is not fetched yet
  const chartRef = useRef(null); // Reference to the chart instance
  const canvasRef = useRef(null); // Reference to the canvas element

  // Fetch the performance summary data from the API
  useEffect(() => {
    axios.get('http://localhost:8000/api/performance-summary/')
      .then(response => {
        setPerformanceData([response.data.avg_rating]); // Set the avg_rating
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Create the chart once the data is ready
  useEffect(() => {
    if (!canvasRef.current) return;

    // 💥 Destroy existing chart before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'bar', // Type of chart
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
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `Rating: ${tooltipItem.raw}`
            }
          }
        }
      }
    });

    // Cleanup the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [performanceData]); // Re-run the effect when performanceData changes

  return (
    <div>
      <h2>Performance Summary</h2>
      <p>Average Rating: {performanceData[0]}</p>

      <h3>Performance Rating Chart</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default PerformanceSummaryChart;
