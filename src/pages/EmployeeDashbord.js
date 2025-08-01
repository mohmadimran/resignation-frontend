import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        This is Employee Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome! You can submit your resignation or complete the exit questionnaire.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/employee/exit-form')}
        sx={{ mt: 2 }}
      >
        Exit Questionnaire
      </Button>
    </Box>
  );
};

export default EmployeeDashboard;

