import React, { useEffect, useState } from 'react';
import { getEmployeeSummary } from '../api';

const EmployeeSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      const summaryData = await getEmployeeSummary();
      setSummary(summaryData);
    };
    fetchSummary();
  }, []);

  return (
    <div>
      <h2>Salary Summary</h2>
      <p>Average Salary: ${summary.avg_salary}</p>
      <p>Max Salary: ${summary.max_salary}</p>
      <p>Min Salary: ${summary.min_salary}</p>
    </div>
  );
};

export default EmployeeSummary;
