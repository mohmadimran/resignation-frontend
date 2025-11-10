import React, { useEffect, useState } from 'react';
import {Box, CircularProgress } from '@mui/material';
import ResignationForm from "../component/resignation/ResignForm";
import ResignStatus from "../component/resignation/ResignStatus"
import {resignationStatus} from "../services/api"

const EmployeeDashboard = () => {
  const [resignation, setResignation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResignation = async () => {
    try {
      const res = await resignationStatus();
      setResignation(res.data.data || null);
    } catch (err) {
      setResignation(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResignation();
  }, []);

  const handleSubmitted = async () => {
    // Re-fetch after form submit to show latest status
    await fetchResignation();
  };

if (loading)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
      }}
    >
      <CircularProgress />
    </Box>
  );
  
  return (
    <Box p={4}>
     
      {/* If resignation found, show status, else show form */}
      {resignation ? (
        <ResignStatus data={resignation} />
      ) : (
        <ResignationForm onSubmitted={handleSubmitted} />
      )}
    </Box>
  );
};

export default EmployeeDashboard;
