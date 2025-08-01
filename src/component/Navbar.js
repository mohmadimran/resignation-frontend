import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // We stored this during login

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Resignation Portal 
        </Typography>

        <Box>
          {!token && (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}

          {token && role === 'employee' && (
            <>
              <Button color="inherit" onClick={() => navigate('/employee/dashboard')}>Employee Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}

          {token && (role === 'admin' || role === 'HR') && (
            <>
              <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>HR Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
