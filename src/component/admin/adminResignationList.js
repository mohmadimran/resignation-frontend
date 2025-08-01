import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const AdminResignationList = ({ token, onSelectResignation }) => {
  const [resignations, setResignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResignations = async () => {
    try {
      const res = await axios.get('/api/admin/resignations', {
        headers: {
          Authorization: token,
        },
      });
      setResignations(res.data.data || []);
    } catch (err) {
      setError('Failed to fetch resignations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResignations();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Card sx={{ maxWidth: 700, margin: 'auto', mt: 8 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          All Resignations
        </Typography>
        {resignations.length === 0 ? (
          <Typography>No resignation requests found.</Typography>
        ) : (
          <List>
            {resignations.map((resignation) => (
              <ListItem
                key={resignation._id}
                sx={{ borderBottom: '1px solid #ddd' }}
                secondaryAction={
                  resignation.status === 'pending' ? (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onSelectResignation(resignation)}
                    >
                      Review
                    </Button>
                  ) : null
                }
              >
                <ListItemText
                  primary={`Employee ID: ${resignation.employeeId}`}
                  secondary={`LWD: ${resignation.lwd} | Status: ${resignation.status}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminResignationList;
