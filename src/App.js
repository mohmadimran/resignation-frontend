import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/homePage';
import Register from './component/auth/register';
import Login from './component/auth/login';
import EmployeeDashboard from './pages/EmployeeDashbord';
import AdminDashboard from './pages/AdminDashboard';
import ExitForm from './pages/ExitForm';
import ExitResponses from './pages/ExitResponse';
import ResignationForm from './component/resignationForm';
import AdminResignationList from './component/admin/adminResignationList';
const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

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
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee/resign" element={<ResignationForm />} />
            <Route path="/employee/exit" element={<ExitForm />} />
          </>
        )}

        {token && (role === 'admin' || role === 'HR') && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/approve" element={<AdminResignationList />} />
            <Route path="/admin/responses" element={<ExitResponses />} />
          </>
        )}
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
