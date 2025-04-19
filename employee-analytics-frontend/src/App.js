import './App.css';
import PerformanceSummaryChart from './components/PerformanceSummaryChart';
import ActiveProjectsChart from './components/ActiveProjectsChart';
import SalaryDistributionChart from './components/SalaryDistributionChart';
import AttendanceSummaryChart from './components/AttendanceSummaryChart';
import SalaryGrowthChart from './components/SalaryGrowthChart';
import EmployeeProjectCountChart from './components/EmployeeProjectCountChart';
import PerformanceByDepartmentChart from './components/PerformanceByDepartmentChart';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeSalaryChart from './components/EmployeeSummary';


function App() {
  return (
    <div>
      <Router>
      <div className="App">
        <h1>Employee Data Dashboard</h1>
        
        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/salary">Salary Summary</Link></li>
            <li><Link to="/performance">Performance</Link></li>
            <li><Link to="/projects">Active Projects</Link></li>
            <li><Link to="/distribution">Salary Distribution</Link></li>
            {/* <li><Link to="/attendance">Attendance</Link></li> */}
            <li><Link to="/growth">Salary Growth</Link></li>
            <li><Link to="/project-count">Project Count</Link></li>
            <li><Link to="/performance-by-department">Performance by Department</Link></li>
          </ul>
        </nav>

        {/* Chart Routes */}
        <Routes>
          <Route path="/salary" element={<EmployeeSalaryChart />} />
          <Route path="/performance" element={<PerformanceSummaryChart />} />
          <Route path="/projects" element={<ActiveProjectsChart />} />
          <Route path="/distribution" element={<SalaryDistributionChart />} />
          {/* <Route path="/attendance" element={<AttendanceSummaryChart />} /> */}
          <Route path="/growth" element={<SalaryGrowthChart />} />
          <Route path="/project-count" element={<EmployeeProjectCountChart />} />
          <Route path="/performance-by-department" element={<PerformanceByDepartmentChart />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
