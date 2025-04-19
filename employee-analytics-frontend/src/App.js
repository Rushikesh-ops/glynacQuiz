import logo from './logo.svg';
import './App.css';
// import EmployeeSummary from './components/EmployeeSummary';
// import DepartmentChart from './components/DepartmentChart';
import PerformanceSummaryChart from './components/PerformanceSummaryChart';
import EmployeeSalaryChart from './components/EmployeeSummary';
import DepartmentCountChart from './components/DepartmentChart';

function App() {
  return (
    <div className="App">
      <EmployeeSalaryChart />
      <DepartmentCountChart />
      <PerformanceSummaryChart />
    </div>
  );
}

export default App;
