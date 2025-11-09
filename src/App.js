import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/homePage';
import Register from './component/auth/register';
import Login from './component/auth/login';
import EmployeeDashboard from './pages/EmployeeDashbord';
import AdminDashboard from './pages/AdminDashboard';
import ExitResponses from './pages/ExitResponse';
import AdminResignationList from './component/admin/adminResignationList';
const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
console.log("token",token)
console.log("role",role)
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {token && role === 'employee' && (
          <>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          </>
        )}

        {token && role === 'HR' && (
          <>
            <Route path="hr-dashboard" element={<AdminDashboard />} />
            <Route path="/hr/approve" element={<AdminResignationList />} />
            <Route path="/hr/responses" element={<ExitResponses />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
