import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PieElement, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js';
import axios from 'axios';

// Register necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,    
  ArcElement,
  PieController,     // For pie chart
  Title,
  Tooltip,
  Legend
);

function AttendanceSummaryChart() {
  const [attendanceData, setAttendanceData] = useState({});
  const chartRef = useRef(null);  // To store chart instance reference
  const canvasRef = useRef(null); // To reference the canvas element

  useEffect(() => {
    // Fetch attendance summary data
    axios.get('http://localhost:8000/api/attendance-summary/')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new pie chart with the updated data
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'pie', // Pie chart type
      data: {
        labels: ['Present', 'Absent', 'Leave'],
        datasets: [{
          label: 'Attendance Status',
          data: [
            attendanceData.Present || 0,
            attendanceData.Absent || 0,
            attendanceData.Leave || 0
          ],
          backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(255,99,132,0.2)', 'rgba(153,102,255,0.2)'],
          borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)', 'rgba(153,102,255,1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Attendance Summary (Last 30 Days)'
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
  }, [attendanceData]);

  return (
    <div>
      <h3>Attendance Summary (Last 30 Days)</h3>
      <canvas ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
}

export default AttendanceSummaryChart;
