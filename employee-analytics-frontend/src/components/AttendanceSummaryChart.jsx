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

function AttendanceSummaryChart() {
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    axios.get('/api/attendance_summary/')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById('attendanceSummaryChart').getContext('2d');
    new ChartJS(ctx, {
      type: 'pie',
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
  }, [attendanceData]);

  return <canvas id="attendanceSummaryChart" width="400" height="200"></canvas>;
}

export default AttendanceSummaryChart;
