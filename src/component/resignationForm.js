import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';

const ResignationForm = ({ token }) => {
  const [lwd, setLwd] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const res = await axios.post(
        '/api/user/resign',
        { lwd },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data?.data?.resignation?._id) {
        setSuccessMessage('Resignation submitted successfully.');
        setLwd('');
      }
    } catch (err) {
      setError('Failed to submit resignation.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 8 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Submit Resignation
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="date"
            label="Last Working Day"
            value={lwd}
            onChange={(e) => setLwd(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </Box>
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ResignationForm;
