import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchResignations = async () => {
      try {
        const res = await axios.get('/api/admin/resignations', {
          headers: { Authorization: token },
        });
        setResignations(res.data.data);
      } catch (err) {
        console.error('Error fetching resignations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResignations();
  }, [token]);

  const handleDecision = async (id, approved, lwd) => {
    try {
      await axios.put(
        '/api/admin/conclude_resignation',
        { resignationId: id, approved, lwd },
        { headers: { Authorization: token } }
      );
      setResignations((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: approved ? 'approved' : 'rejected' } : r))
      );
    } catch (err) {
      console.error('Decision failed:', err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
       This is Admin Dashboard - Resignations
      </Typography>
      <Grid container spacing={2}>
        {resignations.map((r) => (
          <Grid item xs={12} md={6} key={r._id}>
            <Card>
              <CardContent>
                <Typography>ID: {r._id}</Typography>
                <Typography>Employee ID: {r.employeeId}</Typography>
                <Typography>Status: {r.status}</Typography>
                <Typography>LWD: {r.lwd || 'Pending'}</Typography>
                {r.status === 'pending' && (
                  <Box mt={2}>
                    <Button
                      onClick={() => handleDecision(r._id, true, prompt('Enter LWD'))}
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleDecision(r._id, false, '')}
                      variant="contained"
                      color="error"
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
