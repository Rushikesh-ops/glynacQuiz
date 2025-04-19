import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getDepartmentCount } from '../api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      const departmentData = await getDepartmentCount();
      setData(departmentData);
    };
    fetchDepartmentData();
  }, []);

  const chartData = {
    labels: data.map(item => item.department),
    datasets: [
      {
        label: 'Employees by Department',
        data: data.map(item => item.total),
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Employees by Department</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default DepartmentChart;
