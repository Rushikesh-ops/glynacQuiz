import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Django API URL

export const getEmployeeSummary = async () => {
  const response = await axios.get(`${API_URL}/summary/salary/`);
  return response.data;
};

export const getDepartmentCount = async () => {
  const response = await axios.get(`${API_URL}/summary/department/`);
  return response.data;
};
