import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
  Divider,
  Alert,
} from '@mui/material';
// import {getAllResignations,} from "../services/api"

const AdminDashboard = () => {
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchResignations = async () => {
      try {
        const res = await getAllResignations();
        setResignations(res.data?.data || []);
      } catch (err) {
        console.error('Error fetching resignations:', err);
        setError('Failed to load resignation requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchResignations();
  }, [token]);

  const handleDecision = async (id, approved, lwd) => {
    try {
      await axios.put(
        'https://resignation-backend.onrender.com/api/admin/conclude_resignation',
        { resignationId: id, approved, lwd },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResignations((prev) =>
        prev.map((r) =>
          r._id === id
            ? { ...r, status: approved ? 'approved' : 'rejected' }
            : r
        )
      );
    } catch (err) {
      console.error('Decision failed:', err);
      setError('Failed to update decision. Please try again.');
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Resignation Requests
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        {resignations.length === 0 ? (
          <Typography variant="body1" sx={{ ml: 2, mt: 2 }}>
            No resignation requests found.
          </Typography>
        ) : (
          resignations.map((r) => (
            <Grid item xs={12} md={6} key={r._id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {r.name}
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {r.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Job Role:</strong> {r.jobRole}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Employee ID:</strong> {r.employeeId?._id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Reason:</strong> {r.reason}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Last Working Day:</strong> {r.lwd || 'Pending'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        color:
                          r.status === 'approved'
                            ? 'green'
                            : r.status === 'rejected'
                            ? 'red'
                            : '#f57c00',
                        fontWeight: 600,
                      }}
                    >
                      {r.status}
                    </span>
                  </Typography>

                  {r.status === 'pending' && (
                    <Box mt={2}>
                      <Button
                        onClick={() => {
                          const newLwd = prompt('Enter new LWD (YYYY-MM-DD)');
                          if (newLwd) handleDecision(r._id, true, newLwd);
                        }}
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
          ))
        )}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
