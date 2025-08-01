import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleGetStarted = () => {
    if (!token) {
      navigate('/login');
    } else if (role === 'employee') {
      navigate('/employee/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <Box
      sx={{
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Resignation Portal
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
        A centralized system for managing employee resignations and exit formalities.
        Employees can submit resignations and exit forms, while admins can manage requests and feedback.
      </Typography>
      <Button variant="contained" size="large" color="primary" onClick={handleGetStarted}>
        Get Started
      </Button>
    </Box>
  );
};

export default Home;
