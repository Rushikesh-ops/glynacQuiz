import logo from './logo.svg';
import './App.css';
import EmployeeSummary from './components/EmployeeSummary';
import DepartmentChart from './components/DepartmentChart';

function App() {
  return (
    <div className="App">
    <div className="App">
      <h1>Employee Analytics</h1>
      <EmployeeSummary />
      <DepartmentChart />
    </div>
    </div>
  );
}

export default App;
